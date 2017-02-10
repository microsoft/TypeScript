//// [tests/cases/conformance/moduleResolution/untypedModuleImport_allowJs.ts] ////

//// [index.js]
// Same as untypedModuleImport.ts but with --allowJs, so the package will actually be typed.

exports.default = { bar() { return 0; } }

//// [a.ts]
import foo from "foo";
foo.bar();


//// [a.js]
"use strict";
exports.__esModule = true;
var foo_1 = require("foo");
foo_1["default"].bar();
