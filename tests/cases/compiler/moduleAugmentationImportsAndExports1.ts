// @module: commonjs
// @declaration: true

// @filename: f1.ts
export class A {}

// @filename: f2.ts
export class B {
    n: number;
}

// @filename: f3.ts
import {A} from "./f1";
import {B} from "./f2";

A.prototype.foo = function () { return undefined; }
declare module "./f1" {
    interface A {
        foo(): B;
    }
}

// @filename: f4.ts
import {A} from "./f1";
import "./f3";

let a: A;
let b = a.foo().n;