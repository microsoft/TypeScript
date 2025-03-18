//// [tests/cases/compiler/augmentExportEquals4_1.ts] ////

//// [file1.d.ts]
declare module "file1" {
    class foo {}
    namespace foo {
        export var v: number;
    }
    export = foo;
}


//// [file2.ts]
/// <reference path="file1.d.ts"/>
import x = require("file1"); 
x.b = 1;

// OK - './file1' is a namespace
declare module "file1" {
    interface A { a }
    let b: number;
}

//// [file3.ts]
import * as x from "file1";
import "file2";
let a: x.A;
let b = x.b;

//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = require("file1");
x.b = 1;
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = require("file1");
require("file2");
let a;
let b = x.b;
