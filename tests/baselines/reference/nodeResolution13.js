//// [tests/cases/compiler/nodeResolution13.ts] ////

//// [index.d.ts]
/// <reference path="../baz/include.d.ts" />
export class Foo extends BazShim {}

//// [index.d.ts]
/// <reference path="../baz/include.d.ts" />
export class Bar extends BazShim {}

//// [include.d.ts]
declare class BazShim {}

//// [start.ts]
import foo = require("foo");
import bar = require("bar");

new foo.Foo();
new bar.Bar();


//// [start.js]
"use strict";
var foo = require("foo");
var bar = require("bar");
new foo.Foo();
new bar.Bar();
