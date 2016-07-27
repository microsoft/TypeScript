//// [tests/cases/compiler/exportEqualsProperty.ts] ////

//// [declarations.d.ts]
declare namespace foo.bar {
    export type X = number;
    export const X: number;
}

declare module "foobar" {
    export = foo.bar;
}

declare module "foobarx" {
    export = foo.bar.X;
}

//// [index.ts]
/// <reference path="declarations.d.ts" />
import { X } from "foobar";
import X2 = require("foobarx");
const x: X = X;
const x2: X2 = X2;


//// [index.js]
"use strict";
/// <reference path="declarations.d.ts" />
var foobar_1 = require("foobar");
var X2 = require("foobarx");
var x = foobar_1.X;
var x2 = X2;
