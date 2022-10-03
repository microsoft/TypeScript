//// [tests/cases/conformance/moduleResolution/minimal_nodeModules.ts] ////

//// [index.d.ts]
import {} from "./other.js";
export {};

//// [other.d.ts]
export {};

//// [index.d.ts]
export {};

//// [main.ts]
import {} from "foo";
import {} from "./node_modules/foo/index.js";
import type {} from "./node_modules/@types/foo/index.d.ts";


//// [main.js]
"use strict";
exports.__esModule = true;
