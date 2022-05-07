console.log("hello");
process.kill(process.pid, "SIGHUP");
console.log("world");
