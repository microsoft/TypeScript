//// [tests/cases/conformance/moduleResolution/untypedModuleImport_vsAmbient.ts] ////

//// [index.js]
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
/// <reference path="./declarations.d.ts" />
import { x } from "foo";
x;
