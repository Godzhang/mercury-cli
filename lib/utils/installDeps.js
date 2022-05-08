const chalk = require("chalk");
const EventEmitter = require("events");
const execa = require("execa");
const readline = require("readline");
const registries = require("./registries");
const shouldUseTaobao = require("./shouldUseTaobao");

const taobaoDistURL = "https://npm.taobao.org/dist";

const supportPackageManagerList = ["npm", "yarn", "pnpm"];

const packageManagerConfig = {
  npm: {
    installDeps: ["install", "--loglevel", "error"],
    installPackage: ["install", "--loglevel", "error"],
    uninstallPackage: ["uninstall", "--loglevel", "error"],
    updatePackage: ["update", "--loglevel", "error"],
  },

  pnpm: {
    installDeps: ["install", "--loglevel", "error", "--shamefully-flatten"],
    installPackage: ["install", "--loglevel", "error"],
    uninstallPackage: ["uninstall", "--loglevel", "error"],
    updatePackage: ["update", "--loglevel", "error"],
  },

  yarn: {
    installDeps: [],
    installPackage: ["add"],
    uninstallPackage: ["remove"],
    updatePackage: ["upgrade"],
  },
};

class InstallProgress extends EventEmitter {
  constructor() {
    super();

    this._progress = -1;
  }
}

const progress = (exports.progress = new InstallProgress());

function checkPackageManagerIsSupported(command) {
  if (!supportPackageManagerList.includes(command)) {
    throw new Error(`Unkown package manager: ${command}`);
  }
}

function toStartOfLine(stream) {
  if (!chalk.supportsColor) {
    stream.write("\r");
    return;
  }
  readline.cursorTo(stream, 0);
}

function renderProgressBar(curr, total) {
  const ratio = Math.min(Math.max(curr / total, 0), 1);
  const bar = `${curr}/${total}`;
  const availableSpace = Math.max(0, process.stderr.columns - bar.length - 3);
  const width = Math.min(total, availableSpace);
  const completeLength = Math.round(width * ratio);
  const complete = `#`.repeat(completeLength);
  const incomplete = `-`.repeat(width - completeLength);
  toStartOfLine(process.stderr);
  process.stderr.write(`[${complete}${incomplete}]${bar}`);
}

async function addRegistryToArgs(command, args, cliRegistry) {
  const altRegistry =
    cliRegistry || (await shouldUseTaobao(command)) ? registries.taobao : null;

  if (altRegistry) {
    args.push(`--registry=${altRegistry}`);
    if (altRegistry === registries.taobao) {
      args.push(`--disturl=${taobaoDistURL}`);
    }
  }
}

function executeCommand(command, args, targetDir) {
  return new Promise((resolve, reject) => {
    progress.enabled = false;

    const child = execa(command, args, {
      cwd: targetDir,
    });

    if (command === "yarn") {
      child.stderr.on("data", (buf) => {
        const str = buf.toString();
        if (/warning/.test(str)) {
          return;
        }

        // progress bar
        const progressBarMatch = str.match(/\[.*\] (\d+)\/(\d+)/);
        if (progressBarMatch) {
          // since yarn is in a child process, it's unable to get the width of
          // the terminal. reimplement the progress bar ourselves!
          renderProgressBar(progressBarMatch[1], progressBarMatch[2]);
          return;
        }

        process.stderr.write(buf);
      });
    }

    child.on("close", (code) => {
      if (code !== 0) {
        reject(`command failed: ${command} ${args.join(" ")}`);
        return;
      }
      resolve();
    });
  });
}

exports.installDeps = async (targetDir, command, cliRegistry) => {
  checkPackageManagerIsSupported(command);

  const args = packageManagerConfig[command].installDeps;

  await addRegistryToArgs(command, args, cliRegistry);
  await executeCommand(command, args, targetDir);
};
