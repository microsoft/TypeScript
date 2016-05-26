// @module: commonjs

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

namespace N {
    export interface Ifc { a: number; }
    export interface Cls { b: number; }
}
import I = N.Ifc;
import C = N.Cls;

declare module "./f1" {
    interface A {
        foo(): B;
        bar(): I;
        baz(): C;
    }
}

// @filename: f4.ts
import {A} from "./f1";
import "./f3";

let a: A;
let b = a.foo().n;
let c = a.bar().a;
let d = a.baz().b;