//// [tests/cases/conformance/typings/typingsLookup8.ts] ////

//// [package.json]
{}

//// [declarations.d.ts]
declare module "foo" {
    export const x: number;
}

//// [a.ts]
/// <reference path="./declarations.d.ts" />
import { x } from "foo";
x;


//// [a.js]
"use strict";
/// <reference path="./declarations.d.ts" />
var foo_1 = require("foo");
foo_1.x;
