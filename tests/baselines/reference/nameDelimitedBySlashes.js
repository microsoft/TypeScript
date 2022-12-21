//// [tests/cases/conformance/externalModules/nameDelimitedBySlashes.ts] ////

//// [foo_0.ts]
export var foo = 42;

//// [foo_1.ts]
import foo = require('./test/foo_0');
var x = foo.foo + 42;


//// [foo_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = 42;
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo = require("./test/foo_0");
var x = foo.foo + 42;
