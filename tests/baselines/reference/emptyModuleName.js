//// [tests/cases/compiler/emptyModuleName.ts] ////

//// [emptyModuleName.ts]
import * as A from "";
class B extends A {
}

//// [emptyModuleName.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const A = require("");
class B extends A {
}
