//// [tests/cases/compiler/moduleResolution_packageJson_yesAtPackageRoot_fakeScopedPackage.ts] ////

//// [index.js]
// Copy of `moduleResolution_packageJson_notAtPackageRoot` with `foo/@bar` instead of `foo/bar`. Should behave identically.

not read

//// [package.json]
{ "name": "foo", "version": "1.2.3", "types": "types.d.ts" }

//// [types.d.ts]
export const x = 0;

//// [a.ts]
import { x } from "foo/@bar";


//// [a.js]
"use strict";
exports.__esModule = true;
