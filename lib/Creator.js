const chalk = require("chalk");
const execa = require("execa");
const inquirer = require("inquirer");
const EventEmitter = require("events");
const loadRemotePreset = require("./utils/loadRemotePreset");
const copyFile = require("./utils/copyFile");

const { defaults } = require("./options");

const {
  log,
  error,
  hasYarn,
  hasGit,
  hasProjectGit,
  logWithSpinner,
  clearConsole,
  stopSpinner,
  exit,
} = require("../lib/utils/common");

module.exports = class Creator extends EventEmitter {
  constructor(name, context) {
    super();

    this.name = name;
    this.context = context;

    this.run = this.run.bind(this);
  }

  async create(cliOptions = {}, preset = null) {
    const { run, name, context } = this;

    if (cliOptions.preset) {
      preset = await this.resolvePreset(cliOptions.preset, cliOptions.clone);
    } else {
      preset = await this.resolvePreset(
        defaults.presets.default,
        cliOptions.clone
      );
    }

    await clearConsole();
    log(chalk.blue.bold(`mercury-cli v${require("../package.json").version}`));
    logWithSpinner(`✨`, `正在创建项目 ${chalk.yellow(context)}.`);
    this.emit("creation", { event: "creating" });

    stopSpinner();
    // 设置文件名，版本号等
    const { pkgVers, pkgDes } = await inquirer.prompt([
      {
        name: "pkgVers",
        message: "请输入项目版本号",
        default: "1.0.0",
      },
      {
        name: "pkgDes",
        message: "请输入项目简介",
        default: "project create by mercury-cli",
      },
    ]);

    const pkgJson = await copyFile(preset.tmpdir, preset.targetDir);
  }

  async resolvePreset(name, clone) {
    let preset;
    logWithSpinner(`Fetching remote preset ${chalk.cyan(name)}...`);
    this.emit("creation", { event: "fetch-remote-preset" });
    try {
      preset = await loadRemotePreset(name, this.context, clone);
      stopSpinner();
    } catch (e) {
      stopSpinner();
      error(`Failed fetching remote preset ${chalk.cyan(name)}:`);
      throw e;
    }

    // 默认使用 default 参数
    if (name === "default" && !preset) {
      preset = defaults.presets.default;
    }
    if (!preset) {
      error(`preset "${name}" not found.`);
      exit(1);
    }
    return preset;
  }

  run(command, args) {
    if (!args) {
      [command, ...args] = command.split(/\s+/);
    }
    return execa(command, args, { cwd: this.context });
  }
};
