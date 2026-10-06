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
import { __rewriteRelativeImportExtension } from "tslib";
export function dynamic(path) { return import(__rewriteRelativeImportExtension(path, false, { ".astro": ".js" })); }
export function literal() { return import("./Card.js"); }
//// [require.js]
import { __rewriteRelativeImportExtension } from "tslib";
/** @param {string} path */
export function dynamicRequire(path) { return require(__rewriteRelativeImportExtension(path, false, { ".astro": ".js" })); }
