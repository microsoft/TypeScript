//// [tests/cases/conformance/moduleResolution/untypedModuleImport_noImplicitAny2.ts] ////

//// [foo.js]
// This tests that `--noImplicitAny` disables untyped modules.

This file is not processed.

//// [package.json]
{
    "main": "lib/foo"
}

//// [a.ts]
import * as foo from "foo";


//// [a.js]
"use strict";
