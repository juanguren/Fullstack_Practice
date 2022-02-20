import { EventEmitter } from "events";

class Logger extends EventEmitter {
  log(eventName, data) {
    this.emit(eventName, data);
  }
}

export default Logger;
