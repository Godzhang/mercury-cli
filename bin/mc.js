#!/usr/bin/env node
// 检测 node 版本相关依赖
const chalk = require("chalk");
const semver = require("semver");
const pkg = require("../package.json");
const requireVersion = pkg.engines.node;

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        "你用的Node版本号为：" +
          process.version +
          ", 但 " +
          id +
          " 需运行在 " +
          wanted +
          ".\n请升级你的Node版本"
      )
    );
    process.exit(1);
  }
}

checkNodeVersion(requireVersion, "mercury-cli");

if (semver.satisfies(process.version, "12.x")) {
  console.log(
    chalk.red(
      `你是用的Node版本是 ${process.version}.\n` + `强烈建议你使用最新 LTS 版本`
    )
  );
}

// 开始处理命令
const { program } = require("commander");
const minimist = require("minimist");
const leven = require("../lib/utils/leven");

program.version(pkg.version).usage("<command> [options]");

// 创建命令
program
  .command("create <app-name>")
  .description("create a new project")
  .option(
    "-p, --preset <presetName>",
    "Skip prompts and use saved or remote preset"
  )
  .option("-d, --default", "Skip prompts and use default preset")
  .option("-n, --no-git", "exec 'git init' after create project")
  .option("-f, --force", "Overwrite target directory if it exists")
  .option("--skipGetStarted", 'skip displaying "Get started" instructions')
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n ⚠️  检测到您输入了多个名称，将以第一个参数为项目名，舍弃后续参数哦"
        )
      );
    }
    require("../lib/create")(name, options);
  });

program.on("command:*", ([cmd]) => {
  program.outputHelp();
  console.log();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  suggestCommands(cmd);
  process.exitCode = 1;
});

// 自定义错误提示信息
const enhanceErrorMessages = require("../lib/utils/enhanceErrorMessages");
// 缺少参数的错误提示
enhanceErrorMessages("missingArgument", (argName) => {
  return `缺少必要参数 ${chalk.yellow(`<${argName}>`)}`;
});

// 调用
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

// 获取参数
function cleanArgs(cmd) {
  const args = {};
  Object.keys(cmd).forEach((key) => {
    if (typeof cmd[key] !== "function" && typeof cmd[key] !== "undefined") {
      args[key] = cmd[key];
    }
  });
  return args;
}

function suggestCommands(unknowcCommand) {
  const availiableCommands = program.commands.map((cmd) => cmd._name);

  let suggestion;

  availiableCommands.forEach((cmd) => {
    const isBestMatch =
      leven(cmd, unknowcCommand) < leven(suggestion || "", unknowcCommand);
    if (leven(cmd, unknowcCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
  }
}
