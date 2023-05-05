//// [tests/cases/compiler/APILibCheck2.ts] ////

//// [package.json]
{
    "name": "typescript-internal",
    "types": "/.ts/typescript.internal.d.ts"
}

//// [index.ts]
import tsInternal = require("typescript-internal");


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
