const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const download = require("download-git-repo");

const remotePresetMap = {
  react: "github:Godzhang/light-sports",
  vue: "github:Godzhang/light-sports",
};

module.exports = async function (name, targetDir, clone) {
  const tmpdir = path.join(os.tmpdir(), "mercury-cli");

  await fs.remove(tmpdir);

  await new Promise((resolve, reject) => {
    download(remotePresetMap[name], tmpdir, { clone }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

  return {
    targetDir,
    tmpdir,
  };
};
