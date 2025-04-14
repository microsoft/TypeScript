// @module: commonjs
// @noImplicitAny: true
// @strictNullChecks: true
// @lib: es2018
// @exactOptionalPropertyTypes: true
// @noTypesAndSymbols: true
// @noEmit: true

// @filename: node_modules/typescript/package.json
{
    "name": "typescript",
    "types": "/.ts/typescript.d.ts"
}

// @filename: node_modules/typescript-internal/package.json
{
    "name": "typescript-internal",
    "types": "/.ts/typescript.internal.d.ts"
}

// @filename: node_modules/tsserverlibrary/package.json
{
    "name": "tsserverlibrary",
    "types": "/.ts/tsserverlibrary.d.ts"
}

// @filename: node_modules/tsserverlibrary-internal/package.json
{
    "name": "tsserverlibrary-internal",
    "types": "/.ts/tsserverlibrary.internal.d.ts"
}

// @filename: index.ts
import ts = require("typescript");
import tsInternal = require("typescript-internal");
import tsserverlibrary = require("tsserverlibrary");
import tsserverlibraryInternal = require("tsserverlibrary-internal");
