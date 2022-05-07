const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const LRU = require("lru-cache");
const semver = require("semver");

let _hasYarn;
const _yarnProjects = new LRU({
  max: 10,
  ttl: 1000,
});
let _hasGit;
const _gitProjects = new LRU({
  max: 10,
  ttl: 1000,
});

// 环境监测
exports.hasYarn = () => {
  if (_hasYarn != null) {
    return _hasYarn;
  }
  try {
    execSync("yarn --version", { stdio: "ignore" });
    return (_hasYarn = true);
  } catch (e) {
    return (_hasYarn = false);
  }
};

exports.hasProjectYarn = (cwd) => {
  if (_yarnProjects.has(cwd)) {
    return checkYarn(_yarnProjects.get(cwd));
  }

  const lockFile = path.join(cwd, "yarn.lock");
  const result = fs.existsSync(lockFile);
  _yarnProjects.set(cwd, result);
  return checkYarn(result);
};

function checkYarn(result) {
  if (result && !exports.hasYarn())
    throw new Error(`由于项目依赖Yarn,请安装后重试`);
  return result;
}

exports.hasGit = () => {
  if (_hasGit != null) {
    return _hasGit;
  }
  try {
    execSync("git --version", { stdio: "ignore" });
    return (_hasGit = true);
  } catch (e) {
    return (_hasGit = false);
  }
};

exports.hasProjectGit = (cwd) => {
  if (_gitProjects.has(cwd)) {
    return _gitProjects.get(cwd);
  }

  let result;
  try {
    execSync("git status", { stdio: "ignore", cwd });
    result = true;
  } catch (e) {
    result = false;
  }
  _gitProjects.set(cwd, result);
  return result;
};

// OS
exports.isWindows = process.platform === "win32";
exports.isMacintosh = process.platform === "darwin";
exports.isLinux = process.platform === "linux";
