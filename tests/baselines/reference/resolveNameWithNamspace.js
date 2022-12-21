//// [tests/cases/compiler/resolveNameWithNamspace.ts] ////

//// [node.d.ts]
declare function require(moduleName: string): any;

declare module "assert" {
    export function equal(actual: any, expected: any, message?: string | Error): void;
}

//// [ns.ts]
/// <reference path="node.d.ts"/>
namespace myAssert {
    export type cool = 'cool'
}
var myAssert = require('assert')

//// [app.js]
exports.equal = myAssert.equal
exports.equal()

//// [ns.js]
/// <reference path="node.d.ts"/>
var myAssert = require('assert');
//// [app.js]
exports.equal = myAssert.equal;
exports.equal();
