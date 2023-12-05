//// [tests/cases/compiler/augmentExportEquals1_1.ts] ////

//// [file1.d.ts]
declare module "file1" {
    var x: number;
    export = x;
}

//// [file2.ts]
/// <reference path="file1.d.ts"/>
import x = require("file1"); 

// augmentation for 'file1'
// should error since 'file1' does not have namespace meaning
declare module "file1" {
    interface A { a }
}

//// [file3.ts]
import x = require("file1");
import "file2";
let a: x.A; // should not work

//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [file3.js]
define(["require", "exports", "file2"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var a; // should not work
});
