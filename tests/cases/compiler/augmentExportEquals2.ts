// @module: amd

// @filename: file1.ts
function foo() {}
export = foo;

// @filename: file2.ts
import x = require("./file1"); 

// should error since './file1' does not have namespace meaning
declare module "./file1" {
    interface A { a }
}

// @filename: file3.ts
// @filename: file3.ts
import x = require("./file1");
import "./file2";
let a: x.A; // should not work