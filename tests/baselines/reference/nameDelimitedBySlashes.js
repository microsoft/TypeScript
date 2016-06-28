//// [tests/cases/conformance/externalModules/nameDelimitedBySlashes.ts] ////

//// [foo_0.ts]
export var foo = 42;

//// [foo_1.ts]
import foo = require('./test/foo_0');
var x = foo.foo + 42;


//// [foo_0.js]
"use strict";
exports.foo = 42;
//// [foo_1.js]
"use strict";
var foo = require('./test/foo_0');
var x = foo.foo + 42;
