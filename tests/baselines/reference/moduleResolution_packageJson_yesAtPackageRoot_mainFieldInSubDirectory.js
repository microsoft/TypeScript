//// [tests/cases/compiler/moduleResolution_packageJson_yesAtPackageRoot_mainFieldInSubDirectory.ts] ////

//// [package.json]
{ "name": "foo", "version": "1.2.3", "main": "src/index.js" }

//// [index.d.ts]
export const x: number;

//// [index.ts]
import { x } from "foo";


//// [index.js]
"use strict";
exports.__esModule = true;
