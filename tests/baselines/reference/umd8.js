//// [tests/cases/conformance/externalModules/umd8.ts] ////

//// [foo.d.ts]

declare class Thing {
	foo(): number;
}
export = Thing;
export as namespace Foo;

//// [a.ts]
/// <reference path="foo.d.ts" />
let y: Foo;
y.foo();



//// [a.js]
/// <reference path="foo.d.ts" />
var y;
y.foo();
