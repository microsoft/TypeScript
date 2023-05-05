//// [tests/cases/compiler/APILibCheck4.ts] ////

//// [package.json]
{
    "name": "tsserverlibrary-internal",
    "types": "/.ts/tsserverlibrary.internal.d.ts"
}

//// [index.ts]
import tsserverlibraryInternal = require("tsserverlibrary-internal");


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
