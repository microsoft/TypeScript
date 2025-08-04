//// [tests/cases/conformance/node/nodeModulesImportModeDeclarationEmit1.ts] ////

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
import type { RequireInterface } from "pkg" assert { "resolution-mode": "require" };
import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" };

export interface LocalInterface extends RequireInterface, ImportInterface {}

import {type RequireInterface as Req} from "pkg" assert { "resolution-mode": "require" };
import {type ImportInterface as Imp} from "pkg" assert { "resolution-mode": "import" };
export interface Loc extends Req, Imp {}

export type { RequireInterface } from "pkg" assert { "resolution-mode": "require" };
export type { ImportInterface } from "pkg" assert { "resolution-mode": "import" };


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [index.d.ts]
import type { RequireInterface } from "pkg" assert { "resolution-mode": "require" };
import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" };
export interface LocalInterface extends RequireInterface, ImportInterface {
}
import { type RequireInterface as Req } from "pkg" assert { "resolution-mode": "require" };
import { type ImportInterface as Imp } from "pkg" assert { "resolution-mode": "import" };
export interface Loc extends Req, Imp {
}
export type { RequireInterface } from "pkg" assert { "resolution-mode": "require" };
export type { ImportInterface } from "pkg" assert { "resolution-mode": "import" };
