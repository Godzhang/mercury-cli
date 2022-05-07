const LRU = require("lru-cache");

const cache = new LRU({
  max: 4,
  maxAge: 20000,
});

cache.set("key1", "ahwgs");
cache.set("key2", 123123);
cache.set("key3", { name: "ahwgs" });
cache.set("key4", true);
cache.get("key1");
cache.set("key5", true);

console.log("result", cache.get("key1")); // 'ahwgs'
console.log("result", cache.get("key2")); // 123123
console.log("result", cache.get("key3")); // {name:'ahwgs'}
console.log("result", cache.get("key4")); // true
console.log("result", cache.get("key5")); // undefined 因为max4
