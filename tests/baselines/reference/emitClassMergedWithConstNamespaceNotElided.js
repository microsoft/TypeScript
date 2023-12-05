//// [tests/cases/compiler/emitClassMergedWithConstNamespaceNotElided.ts] ////

//// [enum.d.ts]
export namespace Clone {
    const enum LOCAL {
        AUTO = 0,
        LOCAL = 1,
        NO_LOCAL = 2,
        NO_LINKS = 3
    }
}

export class Clone {
    static clone(url: string): void;
}
//// [usage.ts]
import {Clone} from "./enum";

Clone.clone("ok");

//// [usage.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
enum_1.Clone.clone("ok");
