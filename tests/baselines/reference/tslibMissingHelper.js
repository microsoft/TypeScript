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
const tslib_1 = require("tslib");
function foo() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () { });
}
function bar() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () { });
}
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function foo() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () { });
}
