//// [tests/cases/compiler/moduleResolution_packageJson_yesAtPackageRoot_fakeScopedPackage.ts] ////

//// [index.js]
not read

//// [package.json]
{ "name": "foo", "version": "1.2.3", "types": "types.d.ts" }

//// [types.d.ts]
export const x = 0;

//// [a.ts]
import { x } from "foo/@bar";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
