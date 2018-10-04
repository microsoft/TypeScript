//// [tests/cases/conformance/externalModules/umd8.ts] ////

//// [foo.d.ts]
declare class Thing {
	foo(): number;
}
declare namespace Thing {
	interface SubThing { }
}
export = Thing;
export as namespace Foo;

//// [a.ts]
/// <reference path="foo.d.ts" />
import * as ff from './foo';

let y: Foo; // OK in type position
y.foo();
let z: Foo.SubThing; // OK in ns position
let x: any = Foo; // Not OK in value position


//// [a.js]
"use strict";
exports.__esModule = true;
var y; // OK in type position
y.foo();
var z; // OK in ns position
var x = Foo; // Not OK in value position
