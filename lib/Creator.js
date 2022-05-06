const EventEmitter = require("events");

module.exports = class Creator extends EventEmitter {
  constructor(name, context) {
    super();

    this.name = name;
    this.context = context;

    // this.run = this.run.bind(this);
  }
};
