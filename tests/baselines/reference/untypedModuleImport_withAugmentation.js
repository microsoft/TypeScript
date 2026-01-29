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
import { x } from "foo";
x;
