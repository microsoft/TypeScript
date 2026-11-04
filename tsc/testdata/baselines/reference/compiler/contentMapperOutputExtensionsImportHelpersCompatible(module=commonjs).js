//// [tests/cases/compiler/contentMapperOutputExtensionsImportHelpersCompatible.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [package.json]
{ "name": "tslib", "types": "index.d.ts" }

//// [index.d.ts]
export declare function __rewriteRelativeImportExtension(
    path: any,
    preserveJsx?: boolean,
    extraExtensions?: Record<string, string>,
    ignoreCase?: boolean
): any;

//// [Card.astro]
const __VERSION = "1.0.0";
export const Card = 1;

//// [main.ts]
export function dynamic(path: string) { return import(path); }
export function literal() { return import("./Card.astro"); }

//// [require.js]
/** @param {string} path */
export function dynamicRequire(path) { return require(path); }

//// [globals.d.ts]
declare function require(path: string): unknown;


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = dynamic;
exports.literal = literal;
const tslib_1 = require("tslib");
function dynamic(path) { return Promise.resolve(`${tslib_1.__rewriteRelativeImportExtension(path, false, { ".astro": ".js" })}`).then(s => tslib_1.__importStar(require(s))); }
function literal() { return Promise.resolve().then(() => tslib_1.__importStar(require("./Card.js"))); }
//// [require.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicRequire = dynamicRequire;
const tslib_1 = require("tslib");
/** @param {string} path */
function dynamicRequire(path) { return require(tslib_1.__rewriteRelativeImportExtension(path, false, { ".astro": ".js" })); }
