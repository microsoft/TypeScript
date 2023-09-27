//// [tests/cases/conformance/node/nodeModulesImportAttributesModeDeclarationEmit2.ts] ////

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
//// [package.json]
{
    "private": true,
    "type": "module"
}
//// [index.ts]
import type { RequireInterface } from "pkg" with { "resolution-mode": "require" };
import type { ImportInterface } from "pkg" with { "resolution-mode": "import" };

export interface LocalInterface extends RequireInterface, ImportInterface {}

import {type RequireInterface as Req} from "pkg" with { "resolution-mode": "require" };
import {type ImportInterface as Imp} from "pkg" with { "resolution-mode": "import" };
export interface Loc extends Req, Imp {}

export type { RequireInterface } from "pkg" with { "resolution-mode": "require" };
export type { ImportInterface } from "pkg" with { "resolution-mode": "import" };


//// [index.js]
export {};


//// [index.d.ts]
import type { RequireInterface } from "pkg" with { "resolution-mode": "require" };
import type { ImportInterface } from "pkg" with { "resolution-mode": "import" };
export interface LocalInterface extends RequireInterface, ImportInterface {
}
import { type RequireInterface as Req } from "pkg" with { "resolution-mode": "require" };
import { type ImportInterface as Imp } from "pkg" with { "resolution-mode": "import" };
export interface Loc extends Req, Imp {
}
export type { RequireInterface } from "pkg" with { "resolution-mode": "require" };
export type { ImportInterface } from "pkg" with { "resolution-mode": "import" };
