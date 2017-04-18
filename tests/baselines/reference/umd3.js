//// [tests/cases/conformance/externalModules/umd3.ts] ////

//// [foo.d.ts]
export var x: number;
export function fn(): void;
export interface Thing { n: typeof x }
export as namespace Foo;

//// [a.ts]
import * as Foo from './foo';
Foo.fn();
let x: Foo.Thing;
let y: number = x.n;


//// [a.js]
"use strict";
exports.__esModule = true;
var Foo = require("./foo");
Foo.fn();
var x;
var y = x.n;
