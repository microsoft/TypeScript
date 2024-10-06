// @noImplicitReferences: true
// @module: node16,nodenext
// @declaration: true
// @outDir: out
// @filename: /node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": {
        "import": "./import.js",
        "require": "./require.js"
    }
}
// @filename: /node_modules/pkg/import.d.ts
export interface ImportInterface {}
// @filename: /node_modules/pkg/require.d.ts
export interface RequireInterface {}
// @filename: /package.json
{
    "private": true,
    "type": "module"
}
// @filename: /index.ts
import type { RequireInterface } from "pkg" with { "resolution-mode": "require" };
import type { ImportInterface } from "pkg" with { "resolution-mode": "import" };

export interface LocalInterface extends RequireInterface, ImportInterface {}

import {type RequireInterface as Req} from "pkg" with { "resolution-mode": "require" };
import {type ImportInterface as Imp} from "pkg" with { "resolution-mode": "import" };
export interface Loc extends Req, Imp {}

export type { RequireInterface } from "pkg" with { "resolution-mode": "require" };
export type { ImportInterface } from "pkg" with { "resolution-mode": "import" };
