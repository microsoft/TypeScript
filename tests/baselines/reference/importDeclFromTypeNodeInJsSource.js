//// [tests/cases/compiler/importDeclFromTypeNodeInJsSource.ts] ////

//// [index.d.ts]
/// <reference path="events.d.ts" />
//// [events.d.ts]
declare module "events" {
    namespace EventEmitter {
        class EventEmitter {
            constructor();
        }
    }
    export = EventEmitter;
}

//// [b.js]
import { EventEmitter } from 'events';
class Foo extends EventEmitter {
    constructor() {
        super();
    }
}
export default Foo;

//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Foo extends events_1.EventEmitter {
    constructor() {
        super();
    }
}
exports.default = Foo;


//// [b.d.ts]
export default Foo;
declare class Foo extends EventEmitter {
}
import { EventEmitter } from "events";
