//// [tests/cases/conformance/moduleResolution/untypedModuleImport_vsAmbient.ts] ////

//// [index.js]
// This tests that an ambient module declaration overrides an untyped import.

This file is not processed.

//// [declarations.d.ts]
declare module "foo" {
    export const x: number;
}

//// [a.ts]
/// <reference path="./declarations.d.ts" />
import { x } from "foo";
x;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./declarations.d.ts" />
var foo_1 = require("foo");
foo_1.x;
