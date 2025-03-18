//// [tests/cases/conformance/externalModules/umd6.ts] ////

//// [foo.d.ts]
declare namespace Thing {
	export function fn(): number;
}
export = Thing;
export as namespace Foo;

//// [a.ts]
/// <reference path="foo.d.ts" />
let y: number = Foo.fn();


//// [a.js]
let y = Foo.fn();
