//// [tests/cases/compiler/exportAssignmentMerging1.ts] ////

//// [a.ts]
export type Foo = { x: string };
export namespace Bar {
    export interface Baz { y: number }
}
export = { a: 1, b: "hello" };
//// [b.ts]
import a = require("./a");
const c1 = a.a;
const c2 = a.b;
let v1: a.Foo = { x: "test" };
let v2: a.Bar.Baz = { y: 42 };


//// [a.js]
"use strict";
module.exports = { a: 1, b: "hello" };
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
declare const _default: {
    a: number;
    b: string;
};
export = _default;
//// [b.d.ts]
export {};
