//// [tests/cases/conformance/externalModules/topLevelFileModuleMissing.ts] ////

//// [foo_0.ts]
export var x: number;

//// [foo_1.ts]
import foo = require("vs/foo");
var z = foo.x + 10;


//// [foo_1.js]
"use strict";
var foo = require("vs/foo");
var z = foo.x + 10;
