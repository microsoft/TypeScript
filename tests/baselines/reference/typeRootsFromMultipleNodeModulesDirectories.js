//// [tests/cases/compiler/typeRootsFromMultipleNodeModulesDirectories.ts] ////

//// [index.d.ts]
declare module "xyz" {
    export const x: number;
}

//// [index.d.ts]
declare module "pdq" {
    export const y: number; 
}

//// [index.d.ts]
declare module "abc" {
    export const z: number;
}

//// [a.ts]
import { x } from "xyz";
import { y } from "pdq";
import { z } from "abc";
x + y + z;


//// [a.js]
import { x } from "xyz";
import { y } from "pdq";
import { z } from "abc";
x + y + z;
