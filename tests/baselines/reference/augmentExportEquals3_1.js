//// [tests/cases/compiler/augmentExportEquals3_1.ts] ////

//// [file1.d.ts]
declare module "file1" {
    function foo(): void;
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
define(["require", "exports", "file1"], function (require, exports, x) {
    "use strict";
    exports.__esModule = true;
    x.b = 1;
});
//// [file3.js]
define(["require", "exports", "file1", "file2"], function (require, exports, x) {
    "use strict";
    exports.__esModule = true;
    var a;
    var b = x.b;
});
