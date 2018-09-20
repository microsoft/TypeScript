//// [tests/cases/conformance/moduleResolution/untypedModuleImport_noImplicitAny_scoped.ts] ////

//// [package.json]
{ "name": "@foo/bar", "version": "1.2.3" }

//// [index.js]
This file is not processed.

//// [a.ts]
import * as foo from "@foo/bar";


//// [a.js]
"use strict";
exports.__esModule = true;
