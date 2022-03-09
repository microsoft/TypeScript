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
exports.__esModule = true;
var foo = require("foo");
foo.bar();
//// [b.js]
"use strict";
exports.__esModule = true;
var foo = require("foo");
foo();
//// [c.js]
"use strict";
exports.__esModule = true;
var foo_1 = require("foo");
require("./a");
require("./b");
(0, foo_1["default"])((0, foo_1.bar)());
