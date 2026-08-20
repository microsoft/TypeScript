//// [tests/cases/compiler/es6ExportAssignment4.ts] ////

//// [modules.d.ts]
declare module "a" {
    var a: number;
    export = a;  // OK, in ambient context
}

//// [b.ts]
import * as a from "a";


//// [b.js]
export {};
