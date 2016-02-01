// @module: amd

// @filename: file1.ts
class foo {}
namespace foo {
    export class A {}
    export namespace B { export let a; }
}
export = foo;

// @filename: file2.ts
import x = require("./file1"); 
x.B.b = 1;

// OK - './file1' is a namespace
declare module "./file1" {
    interface A { a: number }
    namespace B {
        export let b: number;
    }
}

// @filename: file3.ts
import * as x from "./file1";
import "./file2";
let a: x.A;
let b = a.a;
let c = x.B.b;