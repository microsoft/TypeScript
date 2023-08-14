//// [tests/cases/compiler/nodeNextModuleResolution1.ts] ////

//// [foo.d.ts]
export declare let x: number

//// [package.json]
{
    "name": "e",
    "version": "1.0.0",
    "type": "module"
}
//// [app.ts]
import {x} from "foo";



//// [app.js]
export {};
