//// [tests/cases/compiler/tslibMissingHelper.ts] ////

//// [package.json]
{
    "name": "tslib",
    "main": "tslib.js",
    "typings": "tslib.d.ts"
}

//// [tslib.d.ts]
export const notAHelper: any;

//// [tslib.js]
module.exports.notAHelper = 3;
//// [index.ts]
export {};
async function foo(): Promise<void> {}
async function bar(): Promise<void> {}

//// [index.ts]
export {};
async function foo(): Promise<void> {}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function foo() { }
async function bar() { }
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function foo() { }
