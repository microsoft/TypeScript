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
export const other = 123;
//// [index.js]
const a = null;
function foo() {
    const a = require('../outside-of-rootdir/foo');
    const { other } = require('./other');
}
