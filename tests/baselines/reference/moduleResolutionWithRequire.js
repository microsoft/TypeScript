//// [tests/cases/compiler/moduleResolutionWithRequire.ts] ////

//// [other.ts]
export const other = 123;

//// [index.ts]
declare const require: any;
function foo() {
    const a = require('../outside-of-rootdir/foo');
    const { other }: { other: string } = require('./other');
}


//// [index.js]
function foo() {
    var a = require('../outside-of-rootdir/foo');
    var other = require('./other').other;
}
