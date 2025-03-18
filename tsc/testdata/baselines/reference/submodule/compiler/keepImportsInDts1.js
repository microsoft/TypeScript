//// [tests/cases/compiler/keepImportsInDts1.ts] ////

//// [test.d.ts]
export {}; 
//// [main.ts]
import "test"

//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("test");
