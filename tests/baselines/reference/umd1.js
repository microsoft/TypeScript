//// [tests/cases/conformance/externalModules/umd1.ts] ////

//// [foo.d.ts]
export var x: number;
export function fn(): void;
export interface Thing { n: typeof x }
export as namespace Foo;

//// [a.ts]
/// <reference path="foo.d.ts" />
Foo.fn();
let x: Foo.Thing;
let y: number = x.n;


//// [a.js]
/// <reference path="foo.d.ts" />
Foo.fn();
var x;
var y = x.n;
