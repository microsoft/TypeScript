//// [tests/cases/compiler/sideEffectImports3.ts] ////

//// [index.ts]
import "./not-a-module";

//// [not-a-module.ts]
console.log("Hello, world!");


//// [not-a-module.js]
console.log("Hello, world!");
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./not-a-module");
