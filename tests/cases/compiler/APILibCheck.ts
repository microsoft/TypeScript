// @module: nodenext
// @noImplicitAny: true
// @strictNullChecks: true
// @lib: es2018
// @exactOptionalPropertyTypes: true
// @noTypesAndSymbols: true
// @noEmit: true

// @link: /.ts/typescript.d.ts -> node_modules/typescript/lib/typescript.d.ts
// @filename: node_modules/typescript/package.json
{
    "name": "typescript",
    "type": "module",
    "exports": "./lib/typescript.d.ts"
}

// @link: /.ts/typescript.internal.d.ts -> node_modules/typescript-internal/lib/typescript.internal.d.ts
// @filename: node_modules/typescript-internal/package.json
{
    "name": "typescript-internal",
    "type": "module",
    "exports": "./lib/typescript.internal.d.ts"
}

// @link: /.ts/tsserverlibrary.d.ts -> node_modules/tsserverlibrary/lib/tsserverlibrary.d.ts
// @filename: node_modules/tsserverlibrary/package.json
{
    "name": "tsserverlibrary",
    "type": "module",
    "exports": "./lib/tsserverlibrary.d.ts"
}

// @link: /.ts/tsserverlibrary.internal.d.ts -> node_modules/tsserverlibrary-internal/lib/tsserverlibrary.internal.d.ts
// @filename: node_modules/tsserverlibrary-internal/package.json
{
    "name": "tsserverlibrary-internal",
    "type": "module",
    "exports": "./lib/tsserverlibrary.internal.d.ts"
}

// @filename: package.json
{
    "name": "project",
    "type": "module"
}

// @filename: index.ts
import * as ts from "typescript";
import tsDefault from "typescript";
import * as tsInternal from "typescript-internal";
import tsInternalDefault from "typescript-internal";
import * as tsserverlibrary from "tsserverlibrary";
import tsserverlibraryDefault from "tsserverlibrary";
import * as tsserverlibraryInternal from "tsserverlibrary-internal";
import tsserverlibraryInternalDefault from "tsserverlibrary-internal";
