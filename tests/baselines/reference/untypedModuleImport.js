//// [tests/cases/conformance/moduleResolution/untypedModuleImport.ts] ////

//// [index.js]
// This tests that importing from a JS file globally works in an untyped way.
// (Assuming we don't have `--noImplicitAny` or `--allowJs`.)

This file is not processed.

//// [a.ts]
import * as foo from "foo";
foo.bar();

//// [b.ts]
import foo = require("foo");
foo();

//// [c.ts]
import foo, { bar } from "foo";
import "./a";
import "./b";
foo(bar());


//// [a.js]
"use strict";
var foo = require("foo");
foo.bar();
exports.__esModule = true;
//// [b.js]
"use strict";
var foo = require("foo");
foo();
exports.__esModule = true;
//// [c.js]
"use strict";
var foo_1 = require("foo");
require("./a");
require("./b");
foo_1["default"](foo_1.bar());
exports.__esModule = true;
