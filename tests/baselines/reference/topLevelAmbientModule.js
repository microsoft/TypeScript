//// [tests/cases/conformance/externalModules/topLevelAmbientModule.ts] ////

//// [foo_0.ts]
declare module "foo" {
	export var x: number;
}

//// [foo_1.ts]
/// <reference path="foo_0.ts"/>
import foo = require("foo");
var z = foo.x + 10;


//// [foo_0.js]
//// [foo_1.js]
"use strict";
exports.__esModule = true;
/// <reference path="foo_0.ts"/>
var foo = require("foo");
var z = foo.x + 10;
