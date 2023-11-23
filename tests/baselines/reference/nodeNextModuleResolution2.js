//// [tests/cases/compiler/nodeNextModuleResolution2.ts] ////

//// [index.d.ts]
export declare let x: number
//// [package.json]
{
    "name": "foo",
    "type": "module",
    "exports": {
        ".": "./index.d.ts"
    }
}

//// [app.mts]
import {x} from "foo";


//// [app.mjs]
export {};
