//// [tests/cases/conformance/moduleResolution/untypedModuleImport_allowJs.ts] ////

//// [index.js]
exports.default = { bar() { return 0; } }

//// [a.ts]
import foo from "foo";
foo.bar();


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_1 = require("foo");
foo_1.default.bar();
