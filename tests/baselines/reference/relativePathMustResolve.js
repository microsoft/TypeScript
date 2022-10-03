//// [tests/cases/conformance/externalModules/relativePathMustResolve.ts] ////

//// [foo_0.ts]
export var x = 42;

//// [foo_1.ts]
import foo = require('./test/foo');
var z = foo.x + 10;


//// [foo_1.js]
"use strict";
exports.__esModule = true;
var foo = require("./test/foo");
var z = foo.x + 10;
