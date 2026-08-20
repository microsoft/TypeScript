//// [tests/cases/compiler/moduleResolution_packageJson_notAtPackageRoot_fakeScopedPackage.ts] ////

//// [package.json]
{ "types": "types.d.ts" }

//// [package.json]
{}

//// [types.d.ts]
export const x: number;

//// [a.ts]
import { x } from "foo/@bar";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
