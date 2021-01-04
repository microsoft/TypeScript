//// [tests/cases/conformance/salsa/sourceFileMergeWithFunction.ts] ////

//// [types.d.ts]
declare function foo(props: any): any;
export default foo;
export as namespace foo;

//// [foo.ts]
/// <reference path="types.d.ts" />
declare function foo(): any;


//// [foo.js]
/// <reference path="types.d.ts" />
