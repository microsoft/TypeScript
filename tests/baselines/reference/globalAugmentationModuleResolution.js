//// [tests/cases/conformance/externalModules/globalAugmentationModuleResolution.ts] ////

//// [a.ts]
export { };

declare global {
  var x: number;
}

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
