//// [tests/cases/compiler/augmentExportEquals1.ts] ////

//// [file1.ts]
var x = 1;
export = x;

//// [file2.ts]
import x = require("./file1"); 

// augmentation for './file1'
// should error since './file1' does not have namespace meaning
declare module "./file1" {
    interface A { a }
}

//// [file3.ts]
import x = require("./file1");
import "./file2";
let a: x.A; // should not work

//// [file1.js]
"use strict";
var x = 1;
module.exports = x;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./file2");
let a;
