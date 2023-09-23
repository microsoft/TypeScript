//// [tests/cases/conformance/externalModules/umd4.ts] ////

//// [foo.d.ts]
export var x: number;
export function fn(): void;
export interface Thing { n: typeof x }
export as namespace Foo;

//// [a.ts]
import * as Bar from './foo';
Bar.fn();
let x: Bar.Thing;
let y: number = x.n;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bar = require("./foo");
Bar.fn();
var x;
var y = x.n;
