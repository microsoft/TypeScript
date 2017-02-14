//// [tests/cases/conformance/moduleResolution/untypedModuleImport_withAugmentation.ts] ////

//// [index.js]
// This tests that augmenting an untyped module is forbidden.

This file is not processed.

//// [a.ts]
declare module "foo" {
    export const x: number;
}
import { x } from "foo";
x;


//// [a.js]
"use strict";
exports.__esModule = true;
var foo_1 = require("foo");
foo_1.x;
