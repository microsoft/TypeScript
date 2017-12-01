//// [tests/cases/conformance/moduleResolution/untypedModuleImport_noImplicitAny.ts] ////

//// [index.js]
// This tests that `--noImplicitAny` disables untyped modules.

This file is not processed.

//// [a.ts]
import * as foo from "foo";


//// [a.js]
"use strict";
exports.__esModule = true;
