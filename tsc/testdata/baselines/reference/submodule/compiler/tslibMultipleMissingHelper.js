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
async function foo() { }
async function bar() { }
//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = noop;
exports.spread = spread;
async function noop() { }
function spread({ a, ...rest }) {
    return { c: "c", ...rest };
}
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function foo() { }
