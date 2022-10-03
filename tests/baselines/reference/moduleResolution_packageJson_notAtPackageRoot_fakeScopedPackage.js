//// [tests/cases/compiler/moduleResolution_packageJson_notAtPackageRoot_fakeScopedPackage.ts] ////

//// [package.json]
// Copy of `moduleResolution_packageJson_notAtPackageRoot` with `foo/@bar` instead of `foo/bar`. Should behave identically.

{ "types": "types.d.ts" }

//// [package.json]
{}

//// [types.d.ts]
export const x: number;

//// [a.ts]
import { x } from "foo/@bar";


//// [a.js]
"use strict";
exports.__esModule = true;
