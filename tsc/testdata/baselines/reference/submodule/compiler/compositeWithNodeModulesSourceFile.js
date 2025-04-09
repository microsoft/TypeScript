//// [tests/cases/compiler/compositeWithNodeModulesSourceFile.ts] ////

//// [index.ts]
export class c { }

//// [test.ts]
import myModule = require("myModule");
new myModule.c();



//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myModule = require("myModule");
new myModule.c();
