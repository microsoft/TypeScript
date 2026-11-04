// @target: esnext
// @module: preserve
// @rewriteRelativeImportExtensions: true
// @disableDynamicImportExtensionRewriting: true, false
// @importHelpers: true
// @checkJs: true
// @noEmitOnError: true
// @outDir: /out
// @noTypesAndSymbols: true

// @filename: /globals.d.ts
declare function require(path: string): unknown;

// @filename: /missingTslib/imports.ts
export function dynamicImport(path: string) {
    return import(path);
}

// @filename: /missingTslib/requires.js
/** @param {string} path */
export function dynamicRequire(path) {
    return require(path);
}

// @filename: /missingHelper/node_modules/tslib/index.d.ts
export {};

// @filename: /missingHelper/requires.js
/** @param {string} path */
export function dynamicRequire(path) {
    return require(path);
}

// @filename: /missingHelper/imports.ts
export function dynamicImport(path: string) {
    return import(path);
}
