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
declare module "nestNamespaceModule" {
    namespace a1.a2 {
        class d { }
    }

    namespace a1.a2.n3 {
        class c { }
    }
    export = a1.a2;
}
declare module "renameModule" {
    namespace a.b {
        class c { }
    }
    import d = a.b;
    export = d;
}

//// [b.js]
import { EventEmitter } from 'events';
import { n3, d } from 'nestNamespaceModule';
import { c } from 'renameModule';

export class Foo extends EventEmitter {
}

export class Foo2 extends n3.c {
}

export class Foo3 extends d {
}

export class Foo4 extends c {

}

//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo4 = exports.Foo3 = exports.Foo2 = exports.Foo = void 0;
const events_1 = require("events");
const nestNamespaceModule_1 = require("nestNamespaceModule");
const renameModule_1 = require("renameModule");
class Foo extends events_1.EventEmitter {
}
exports.Foo = Foo;
class Foo2 extends nestNamespaceModule_1.n3.c {
}
exports.Foo2 = Foo2;
class Foo3 extends nestNamespaceModule_1.d {
}
exports.Foo3 = Foo3;
class Foo4 extends renameModule_1.c {
}
exports.Foo4 = Foo4;


//// [b.d.ts]
export class Foo extends EventEmitter {
}
export class Foo2 extends n3.c {
}
export class Foo3 extends d {
}
export class Foo4 extends c {
}
import { EventEmitter } from "events";
import { n3 } from "nestNamespaceModule";
import { d } from "nestNamespaceModule";
import { c } from "renameModule";
