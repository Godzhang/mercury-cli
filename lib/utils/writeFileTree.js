const fs = require("fs-extra");
const path = require("path");

function deleteRemovedFiles(directory, newFiles, previousFiles) {
  const filesToDelete = Object.keys(previousFiles).filter(
    (filename) => !newFiles[filename]
  );
  return new Promise.all(
    filesToDelete.map((filename) => {
      return fs.unlink(path.join(directory, filename));
    })
  );
}

module.exports = async function (dir, files, previousFiles) {
  if (previousFiles) {
    await deleteRemovedFiles(dir, files, previousFiles);
  }
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name);
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, files[name]);
  });
};
