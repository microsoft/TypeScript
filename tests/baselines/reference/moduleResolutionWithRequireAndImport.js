//// [tests/cases/compiler/moduleResolutionWithRequireAndImport.ts] ////

//// [other.ts]
export const other = 123;

//// [index.ts]
declare const require: any;
const a: typeof import('./other') = null as any
function foo() {
    const a = require('../outside-of-rootdir/foo');
    const { other }: { other: string } = require('./other');
}


//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.other = void 0;
exports.other = 123;
//// [index.js]
var a = null;
function foo() {
    var a = require('../outside-of-rootdir/foo');
    var other = require('./other').other;
}
