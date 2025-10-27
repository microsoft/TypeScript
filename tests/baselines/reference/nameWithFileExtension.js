//// [tests/cases/conformance/externalModules/nameWithFileExtension.ts] ////

//// [foo_0.ts]
export var foo = 42;

//// [foo_1.ts]
import foo = require('./foo_0.js');
var x = foo.foo + 42;


//// [foo_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = 42;
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("./foo_0.js");
var x = foo.foo + 42;
