// @module: node16
// @checkJs: true
// @allowJs: true
// @noEmit: true

// @Filename: /node_modules/@types/foo/package.json
{
    "name": "@types/foo",
    "version": "1.0.0",
    "exports": {
        ".": {
            "import": "./index.d.mts",
            "require": "./index.d.cts"
        }
    }
}

// @Filename: /node_modules/@types/foo/index.d.mts
export declare const Import: "module";

// @Filename: /node_modules/@types/foo/index.d.cts
export declare const Require: "script";

// @Filename: /a.js
/** @import { Import } from 'foo' with { 'resolution-mode': 'import' } */
/** @import { Require } from 'foo' with { 'resolution-mode': 'require' } */

/**
 * @returns { Import }
 */
export function f1() {
    return 1;
}

/**
 * @returns { Require }
 */
export function f2() {
    return 1;
}
