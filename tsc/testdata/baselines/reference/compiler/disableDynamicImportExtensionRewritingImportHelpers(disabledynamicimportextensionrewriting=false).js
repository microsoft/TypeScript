//// [tests/cases/compiler/disableDynamicImportExtensionRewritingImportHelpers.ts] ////

//// [globals.d.ts]
declare function require(path: string): unknown;

//// [imports.ts]
export function dynamicImport(path: string) {
    return import(path);
}

//// [requires.js]
/** @param {string} path */
export function dynamicRequire(path) {
    return require(path);
}

//// [index.d.ts]
export {};

//// [requires.js]
/** @param {string} path */
export function dynamicRequire(path) {
    return require(path);
}

//// [imports.ts]
export function dynamicImport(path: string) {
    return import(path);
}




!!!! File /out/missingTslib/imports.js missing from original emit, but present in noCheck emit
//// [imports.js]
import { __rewriteRelativeImportExtension } from "tslib";
export function dynamicImport(path) {
    return import(__rewriteRelativeImportExtension(path));
}


!!!! File /out/missingTslib/requires.js missing from original emit, but present in noCheck emit
//// [requires.js]
import { __rewriteRelativeImportExtension } from "tslib";
/** @param {string} path */
export function dynamicRequire(path) {
    return require(__rewriteRelativeImportExtension(path));
}


!!!! File /out/missingHelper/requires.js missing from original emit, but present in noCheck emit
//// [requires.js]
import { __rewriteRelativeImportExtension } from "tslib";
/** @param {string} path */
export function dynamicRequire(path) {
    return require(__rewriteRelativeImportExtension(path));
}


!!!! File /out/missingHelper/imports.js missing from original emit, but present in noCheck emit
//// [imports.js]
import { __rewriteRelativeImportExtension } from "tslib";
export function dynamicImport(path) {
    return import(__rewriteRelativeImportExtension(path));
}
