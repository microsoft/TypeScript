//// [tests/cases/compiler/augmentExportEquals6_1.ts] ////

//// [file1.d.ts]
declare module "file1" {
    class foo {}
    namespace foo {
        class A {}
    }
    export = foo;
}


//// [file2.ts]
/// <reference path="file1.d.ts"/>
import x = require("file1"); 

// OK - './file1' is a namespace
declare module "file1" {
    interface A { a: number }
}

//// [file3.ts]
import * as x from "file1";
import "file2";
let a: x.A;
let b = a.a;

//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [file3.js]
define(["require", "exports", "file2"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var a;
    var b = a.a;
});
