//// [tests/cases/compiler/tslibMultipleMissingHelper.ts] ////

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

//// [other.ts]
export {};
export async function noop(): Promise<void> {}
export function spread({ a, ...rest }: { a: number, b: number}) {
    return { c: "c", ...rest };
}

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
//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = noop;
exports.spread = spread;
const tslib_1 = require("tslib");
function noop() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () { });
}
function spread(_a) {
    var { a } = _a, rest = tslib_1.__rest(_a, ["a"]);
    return Object.assign({ c: "c" }, rest);
}
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function foo() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () { });
}
