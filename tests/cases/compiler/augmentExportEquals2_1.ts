// @module: amd

// @filename: file1.d.ts
declare module "file1" {
    function foo(): void;
    export = foo;
}

// @filename: file2.ts

/// <reference path="file1.d.ts"/> 
import x = require("file1"); 

// should error since './file1' does not have namespace meaning
declare module "file1" {
    interface A { a }
}

// @filename: file3.ts
import x = require("file1");
import "file2";
let a: x.A; // should not work