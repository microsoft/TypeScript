//// [tests/cases/compiler/APILibCheck3.ts] ////

//// [package.json]
{
    "name": "tsserverlibrary",
    "types": "/.ts/tsserverlibrary.d.ts"
}

//// [index.ts]
import tsserverlibrary = require("tsserverlibrary");


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
