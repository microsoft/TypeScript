// @module: commonjs
// @allowJs: true
// @outDir: ./out/

// @filename: node.d.ts
declare function require(moduleName: string): any;

declare module "assert" {
    export function equal(actual: any, expected: any, message?: string | Error): void;
}

// @filename: ns.ts
/// <reference path="node.d.ts"/>
namespace myAssert {
    export type cool = 'cool'
}
var myAssert = require('assert')

// @filename: app.js
exports.equal = myAssert.equal
exports.equal()