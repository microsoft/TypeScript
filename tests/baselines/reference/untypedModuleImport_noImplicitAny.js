//// [tests/cases/conformance/moduleResolution/untypedModuleImport_noImplicitAny.ts] ////

//// [package.json]
{ "name": "foo", "version": "1.2.3" }

//// [index.js]
This file is not processed.

//// [a.ts]
import * as foo from "foo";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
