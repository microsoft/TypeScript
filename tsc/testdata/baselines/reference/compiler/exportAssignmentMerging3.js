//// [tests/cases/compiler/exportAssignmentMerging3.ts] ////

//// [a.ts]
export type Foo = { x: string };
export namespace Bar {
    export interface Baz { y: number }
}
namespace mod {
    export type Foo = { s: string }; // Causes error
    export const a = 1;
    export const b = "hello";
}
export = mod;
//// [b.ts]
import a = require("./a");
const c1 = a.a;
const c2 = a.b;
let v1: a.Foo = { x: "test" };
let v2: a.Bar.Baz = { y: 42 };


//// [a.js]
"use strict";
var mod;
(function (mod) {
    mod.a = 1;
    mod.b = "hello";
})(mod || (mod = {}));
module.exports = mod;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = require("./a");
const c1 = a.a;
const c2 = a.b;
let v1 = { x: "test" };
let v2 = { y: 42 };


//// [a.d.ts]
export type Foo = {
    x: string;
};
export declare namespace Bar {
    interface Baz {
        y: number;
    }
}
declare namespace mod {
    type Foo = {
        s: string;
    };
    const a = 1;
    const b = "hello";
}
export = mod;
//// [b.d.ts]
export {};
