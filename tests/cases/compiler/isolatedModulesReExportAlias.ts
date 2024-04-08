// @isolatedModules: true
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: /events.d.ts
declare module "events" {
  interface EventEmitterOptions {
    captureRejections?: boolean;
  }
  class EventEmitter {
    constructor(options?: EventEmitterOptions);
  }
  export = EventEmitter;
}
declare module "node:events" {
  import events = require("events");
  export = events;
}

// @Filename: /moreEvents.ts
import events = require("events");
export = events;

// @Filename: /boo.ts
// Bad test runner (ignores stuff when last file contains the string r-e-q-u-i-r-e)