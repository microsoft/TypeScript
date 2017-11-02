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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var foo = __importStar(require("foo"));
foo.bar();
//// [b.js]
"use strict";
exports.__esModule = true;
var foo = require("foo");
foo();
//// [c.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
exports.__esModule = true;
var foo_1 = __importDefault(require("foo"));
require("./a");
require("./b");
foo_1["default"](foo_1.bar());
