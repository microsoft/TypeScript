//// [tests/cases/conformance/externalModules/umd7.ts] ////

//// [foo.d.ts]
declare function Thing(): number;
export = Thing;
export as namespace Foo;

//// [a.ts]
/// <reference path="foo.d.ts" />
let y: number = Foo();


//// [a.js]
/// <reference path="foo.d.ts" />
var y = Foo();
