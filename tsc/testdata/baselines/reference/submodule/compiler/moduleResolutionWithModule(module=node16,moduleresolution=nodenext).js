//// [tests/cases/compiler/moduleResolutionWithModule.ts] ////

//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": "./entrypoint.js"
}
//// [entrypoint.d.ts]
export declare function thing(): void;
//// [index.ts]
import * as p from "pkg";
p.thing();

//// [index.js]
import * as p from "pkg";
p.thing();
