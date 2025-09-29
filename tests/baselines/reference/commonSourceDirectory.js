//// [tests/cases/compiler/commonSourceDirectory.ts] ////

//// [index.ts]
export const x = 0;

//// [bar.d.ts]
declare module "bar" {
    export const y = 0;
}

//// [index.ts]
/// <reference path="../types/bar.d.ts" preserve="true" />
import { x } from "foo";
import { y } from "bar";
x + y;


//// [/app/bin/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../types/bar.d.ts" preserve="true" />
var foo_1 = require("foo");
var bar_1 = require("bar");
foo_1.x + bar_1.y;
//# sourceMappingURL=../myMapRoot/index.js.map

//// [/app/bin/index.d.ts]
/// <reference path="../../types/bar.d.ts" preserve="true" />
export {};


//// [DtsFileErrors]


error TS5011: Inferred common source directory differs from tsconfig directory, output layout will be changed.
  Visit https://aka.ms/ts6 for migration information.


!!! error TS5011: Inferred common source directory differs from tsconfig directory, output layout will be changed.
!!! error TS5011:   Visit https://aka.ms/ts6 for migration information.
==== /app/tsconfig.json (0 errors) ====
    {
        "compilerOptions": {
            "outDir": "bin",
            "typeRoots": ["../types"],
            "sourceMap": true,
            "mapRoot": "myMapRoot",
            "sourceRoot": "mySourceRoot",
            "declaration": true
        }
    }
    
==== /app/bin/index.d.ts (0 errors) ====
    /// <reference path="../../types/bar.d.ts" preserve="true" />
    export {};
    
==== /types/bar.d.ts (0 errors) ====
    declare module "bar" {
        export const y = 0;
    }
    