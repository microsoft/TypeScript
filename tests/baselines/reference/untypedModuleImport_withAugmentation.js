//// [tests/cases/conformance/moduleResolution/untypedModuleImport_withAugmentation.ts] ////

//// [index.js]
This file is not processed.

//// [a.ts]
declare module "foo" {
    export const x: number;
}
import { x } from "foo";
x;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_1 = require("foo");
foo_1.x;
