//// [tests/cases/conformance/node/nodeModulesImportAttributesModeDeclarationEmitErrors.ts] ////

//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": {
        "import": "./import.js",
        "require": "./require.js"
    }
}
//// [import.d.ts]
export interface ImportInterface {}
//// [require.d.ts]
export interface RequireInterface {}
//// [index.ts]
// incorrect mode
import type { RequireInterface } from "pkg" with { "resolution-mode": "foobar" };
// not type-only
import { ImportInterface } from "pkg" with { "resolution-mode": "import" };
// not exclusively type-only
import {type RequireInterface as Req, RequireInterface as Req2} from "pkg" with { "resolution-mode": "require" };

export interface LocalInterface extends RequireInterface, ImportInterface {}





//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [index.d.ts]
import type { RequireInterface } from "pkg";
import { ImportInterface } from "pkg" with { "resolution-mode": "import" };
export interface LocalInterface extends RequireInterface, ImportInterface {
}
