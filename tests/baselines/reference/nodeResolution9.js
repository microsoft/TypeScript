//// [tests/cases/compiler/nodeResolution9.ts] ////

//// [ref.d.ts]

declare module "internal" {
	export var foo: void;
}

//// [index.d.ts]
/// <reference path="ref.d.ts"/>
export * from "internal";


//// [b.ts]
import y = require("a");
import z = require("internal"); // should error

//// [b.js]
"use strict";
