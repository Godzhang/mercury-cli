const chalk = require("chalk");
const readline = require("readline");
const EventEmitter = require("events");

exports.events = new EventEmitter();

const format = (label, msg) => {
  return msg
    .split("\n")
    .map((line, i) => {
      return i === 0
        ? `${label} ${line}`
        : line.padStart(chalk.reset(label).length);
    })
    .join("\n");
};

const chalkTag = (msg) => chalk.bgBlackBright.white.dim(` ${msg} `);

exports.log = (msg = "", tag = null) => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
};

exports.warn = (msg, tag = null) => {
  console.warn(
    format(
      chalk.bgYellow.black(" WARN ") + (tag ? chalkTag(tag) : ""),
      chalk.yellow(msg)
    )
  );
};

exports.error = (msg, tag = null) => {
  console.error(
    format(chalk.bgRed(" ERROR ") + (tag ? chalkTag(tag) : ""), chalk.red(msg))
  );
  if (msg instanceof Error) {
    console.error(msg.stack);
  }
};

exports.clearConsole = (title) => {
  if (process.stdout.isTTY) {
    const blank = "\n".repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.log(title);
    }
  }
};
