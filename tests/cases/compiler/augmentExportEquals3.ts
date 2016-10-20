// @module: amd

// @filename: file1.ts
function foo() {}
namespace foo {
    export var v = 1;
}
export = foo;

// @filename: file2.ts
import x = require("./file1"); 
x.b = 1;

// OK - './file1' is a namespace
declare module "./file1" {
    interface A { a }
    let b: number;
}

// @filename: file3.ts
import * as x from "./file1";
import "./file2";
let a: x.A;
let b = x.b;