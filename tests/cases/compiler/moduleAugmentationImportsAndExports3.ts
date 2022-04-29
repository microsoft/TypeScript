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

A.prototype.foo = function () { return undefined; }

namespace N {
    export interface Ifc { a }
    export interface Cls { a }
}

declare module "./f1" {
    import {B} from "./f2";
    import I = N.Ifc;
    import C = N.Cls;
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