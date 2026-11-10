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


//// [imports.js]
export function dynamicImport(path) {
    return import(path);
}
//// [requires.js]
/** @param {string} path */
export function dynamicRequire(path) {
    return require(path);
}
//// [requires.js]
/** @param {string} path */
export function dynamicRequire(path) {
    return require(path);
}
//// [imports.js]
export function dynamicImport(path) {
    return import(path);
}
