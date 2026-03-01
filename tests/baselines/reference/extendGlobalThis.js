//// [tests/cases/compiler/extendGlobalThis.ts] ////

//// [extension.d.ts]
declare global {
    namespace globalThis  {
        var test: string;
    }
}

export {}

//// [index.ts]
import "./extention";

globalThis.tests = "a-b";
console.log(globalThis.test.split("-"));


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./extention");
globalThis.tests = "a-b";
console.log(globalThis.test.split("-"));
