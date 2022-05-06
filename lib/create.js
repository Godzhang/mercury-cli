const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const Creator = require("./Creator");
const validatePackageName = require("validate-npm-package-name");
const {
  error,
  stopSpinner,
  exit,
  clearConsole,
} = require("../lib/utils/common");

// 创建项目
async function create(projectName, options) {
  const cwd = options.cwd || process.cwd();
  // 是否在当前目录
  const isCurrent = projectName === ".";
  const name = isCurrent ? path.relative("../", cwd) : projectName;
  const targetDir = path.resolve(cwd, projectName || ".");

  const result = validatePackageName(name);
  // 如果所输入的不是合法npm包名，则退出
  if (!result.validForNewPackages) {
    console.error(chalk.red(`不合法的项目名：${name}`));
    result.errors &&
      result.errors.forEach((err) => {
        console.error(chalk.red.dim("❌ " + err));
      });
    result.warnings &&
      result.warnings.forEach((warn) => {
        console.error(chalk.red.dim("⚠️ " + warn));
      });
    exit(1);
  }
}

module.exports = (...args) => {
  return create(...args).catch((err) => {
    stopSpinner(false);
    // error(err);
  });
};
