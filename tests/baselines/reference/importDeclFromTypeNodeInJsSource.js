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
import { EventEmitter } from "node/events";


//// [DtsFileErrors]


dist/b.d.ts(4,30): error TS2307: Cannot find module 'node/events' or its corresponding type declarations.


==== /src/node_modules/@types/node/index.d.ts (0 errors) ====
    /// <reference path="events.d.ts" />
==== /src/node_modules/@types/node/events.d.ts (0 errors) ====
    declare module "events" {
        namespace EventEmitter {
            class EventEmitter {
                constructor();
            }
        }
        export = EventEmitter;
    }
    
==== ./dist/b.d.ts (1 errors) ====
    export default Foo;
    declare class Foo extends EventEmitter {
    }
    import { EventEmitter } from "node/events";
                                 ~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'node/events' or its corresponding type declarations.
    