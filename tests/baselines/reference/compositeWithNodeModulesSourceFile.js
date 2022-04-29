//// [tests/cases/compiler/compositeWithNodeModulesSourceFile.ts] ////

//// [index.ts]
export class c { }

//// [test.ts]
import myModule = require("myModule");
new myModule.c();



//// [test.js]
"use strict";
exports.__esModule = true;
var myModule = require("myModule");
new myModule.c();


//// [test.d.ts]
export {};
