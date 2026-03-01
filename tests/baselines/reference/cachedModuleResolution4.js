//// [tests/cases/compiler/cachedModuleResolution4.ts] ////

//// [foo.d.ts]
export declare let x: number

//// [lib.ts]
import {x} from "foo";

//// [app.ts]
import {x} from "foo";


//// [lib.js]
export {};
//// [app.js]
export {};
