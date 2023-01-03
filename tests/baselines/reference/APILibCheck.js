//// [tests/cases/compiler/APILibCheck.ts] ////

//// [package.json]
{
    "name": "typescript",
    "types": "/.ts/typescript.d.ts"
}

//// [package.json]
{
    "name": "typescript-internal",
    "types": "/.ts/typescript.internal.d.ts"
}

//// [package.json]
{
    "name": "tsserverlibrary",
    "types": "/.ts/tsserverlibrary.d.ts"
}

//// [package.json]
{
    "name": "tsserverlibrary-internal",
    "types": "/.ts/tsserverlibrary.internal.d.ts"
}

//// [index.ts]
import ts = require("typescript");
import tsInternal = require("typescript-internal");
import tsserverlibrary = require("tsserverlibrary");
import tsserverlibraryInternal = require("tsserverlibrary-internal");


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
