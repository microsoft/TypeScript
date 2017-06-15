//// [tests/cases/conformance/externalModules/umd2.ts] ////

//// [foo.d.ts]
export var x: number;
export function fn(): void;
export as namespace Foo;

//// [a.ts]
Foo.fn();
let x: Foo.Thing;
let y: number = x.n;


//// [a.js]
Foo.fn();
var x;
var y = x.n;
