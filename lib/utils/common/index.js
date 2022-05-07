["spinner", "logger", "exit", "env"].forEach((m) => {
  Object.assign(exports, require(`./${m}`));
});
