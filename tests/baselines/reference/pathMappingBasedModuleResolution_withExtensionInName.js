//// [tests/cases/compiler/pathMappingBasedModuleResolution_withExtensionInName.ts] ////

//// [index.d.ts]
export const x: number;

//// [index.d.ts]
export const y: number;

//// [a.ts]
import { x } from "zone.js";
import { y } from "zone.tsx";


//// [a.js]
"use strict";
exports.__esModule = true;
