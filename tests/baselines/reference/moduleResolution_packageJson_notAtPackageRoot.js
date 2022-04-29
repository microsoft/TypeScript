//// [tests/cases/compiler/moduleResolution_packageJson_notAtPackageRoot.ts] ////

//// [package.json]
// Loads from a "fake" nested package.json, not from the one at the root.

{ "types": "types.d.ts" }

//// [package.json]
{}

//// [types.d.ts]
export const x: number;

//// [a.ts]
import { x } from "foo/bar";


//// [a.js]
"use strict";
exports.__esModule = true;
