// @module: amd

// @filename: file1.d.ts
declare module "file1" {
    class foo {}
    namespace foo {
        class A {}
    }
    export = foo;
}


// @filename: file2.ts
/// <reference path="file1.d.ts"/>
import x = require("file1"); 

// OK - './file1' is a namespace
declare module "file1" {
    interface A { a: number }
}

// @filename: file3.ts
import * as x from "file1";
import "file2";
let a: x.A;
let b = a.a;