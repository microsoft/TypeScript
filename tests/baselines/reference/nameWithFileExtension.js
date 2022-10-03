//// [tests/cases/conformance/externalModules/nameWithFileExtension.ts] ////

//// [foo_0.ts]
export var foo = 42;

//// [foo_1.ts]
import foo = require('./foo_0.js');
var x = foo.foo + 42;


//// [foo_0.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
exports.foo = 42;
//// [foo_1.js]
"use strict";
exports.__esModule = true;
var foo = require("./foo_0.js");
var x = foo.foo + 42;
