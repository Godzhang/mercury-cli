// const { program } = require("commander");
// const minimist = require("minimist");

// program
//   .version("1.0.0", "-v, --vers")
//   .command("start <name> [options...]")
//   .description("test a whole commander order")
//   .option("-e, --extra [exargs]", "test a options")
//   .action((name, startOption, cmd) => {
//     console.log(name);
//     console.log(startOption);
//     console.log(cmd);
//   });

// program.parse(process.argv);

// let args = minimist(process.argv, { string: ["extra"] });
// console.log(args);

// const leven = require("leven");
// import leven from "leven";

// console.log(leven("hello", "hello")); // 0
// console.log(leven("hello", "hella")); // 1
// console.log(leven("hello", "aelii")); // 3
// console.log(leven("hello", "hello world")); // 6

import slash from "slash";

console.log(process.cwd());
console.log(slash(process.cwd()));
