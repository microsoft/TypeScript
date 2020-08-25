//// [tests/cases/compiler/aliasDeclaredAfterFirstUsageUsedByDeclarationEmit.ts] ////

//// [init.ts]
export interface A {
    a: true;
}

export interface B {
    b: true;
}

export function f(thing?: A | B): A | B { return null as any; };
//// [utils.ts]
import {A, B} from "./init";

export type Either = A | B;
//// [usage.ts]
import {Either} from "./utils";
import {f} from "./init";

export function doThing() {
    return f();
}

//// [init.js]
"use strict";
exports.__esModule = true;
exports.f = void 0;
function f(thing) { return null; }
exports.f = f;
;
//// [utils.js]
"use strict";
exports.__esModule = true;
//// [usage.js]
"use strict";
exports.__esModule = true;
exports.doThing = void 0;
var init_1 = require("./init");
function doThing() {
    return init_1.f();
}
exports.doThing = doThing;


//// [init.d.ts]
export interface A {
    a: true;
}
export interface B {
    b: true;
}
export declare function f(thing?: A | B): A | B;
//// [utils.d.ts]
import { A, B } from "./init";
export declare type Either = A | B;
//// [usage.d.ts]
import { Either } from "./utils";
export declare function doThing(): Either;
