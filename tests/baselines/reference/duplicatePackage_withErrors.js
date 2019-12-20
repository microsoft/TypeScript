//// [tests/cases/compiler/duplicatePackage_withErrors.ts] ////

//// [index.d.ts]
export { x } from "x";

//// [index.d.ts]
export const x = 1 + 1;

//// [package.json]
{ "name": "x", "version": "1.2.3" }

//// [index.d.ts]
export { x } from "x";

//// [index.d.ts]
content not parsed

//// [package.json]
{ "name": "x", "version": "1.2.3" }

//// [a.ts]
import { x as xa } from "a";
import { x as xb } from "b";


//// [a.js]
"use strict";
exports.__esModule = true;
