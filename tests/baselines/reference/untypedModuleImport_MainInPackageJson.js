//// [tests/cases/conformance/moduleResolution/untypedModuleImport_MainInPackageJson.ts] ////

//// [foo.js]
// This tests that importing from a JS file globally works in an untyped way.
// (Assuming we don't have `--noImplicitAny` or `--allowJs`.)

This file is not processed.

//// [package.json]
{
    "main": "lib/foo"
}

//// [a.ts]
import * as foo from "foo";
foo.bar();


//// [a.js]
"use strict";
var foo = require("foo");
foo.bar();
