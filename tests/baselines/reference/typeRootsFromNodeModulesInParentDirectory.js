//// [tests/cases/compiler/typeRootsFromNodeModulesInParentDirectory.ts] ////

//// [index.d.ts]
declare module "xyz" {
    export const x: number;
}

//// [a.ts]
import { x } from "xyz";
x;


//// [a.js]
import { x } from "xyz";
x;
