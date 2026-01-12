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

declare let y: Foo; // OK in type position
y.foo();
declare let z: Foo.SubThing; // OK in ns position
let x: any = Foo; // Not OK in value position


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
y.foo();
var x = Foo; // Not OK in value position
