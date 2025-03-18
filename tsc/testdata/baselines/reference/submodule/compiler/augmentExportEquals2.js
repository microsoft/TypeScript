//// [tests/cases/compiler/augmentExportEquals2.ts] ////

//// [file1.ts]
function foo() {}
export = foo;

//// [file2.ts]
import x = require("./file1"); 

// should error since './file1' does not have namespace meaning
declare module "./file1" {
    interface A { a }
}

//// [file3.ts]

//// [file3.ts]
import x = require("./file1");
import "./file2";
let a: x.A; // should not work

//// [file3.js]
