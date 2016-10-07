//// [tests/cases/conformance/moduleResolution/moduleResolution_allowJs.ts] ////

//// [package.json]
// Same as untypedModuleImport.ts but with --allowJs (which has no effect)

{}

//// [index.js]
exports.default = {
    bar() { return 0; }
}

//// [a.ts]
import foo from "foo";
foo.bar();


//// [a.js]
"use strict";
var foo_1 = require("foo");
foo_1["default"].bar();
