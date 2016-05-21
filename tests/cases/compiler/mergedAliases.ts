// @module: commonjs
// @declaration: true

// @Filename: a.ts
export class A {
    static M: number;
}

// @Filename: b.ts
import {A} from  "./a";
namespace A {
    export interface I { }
}
var x: A.I;
var y = A.M;
export = A;

// @Filename: c.ts
import * as B from "./b";
var x: B.I;
var y = B.M;
