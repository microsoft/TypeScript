//// [tests/cases/conformance/ambient/ambientExternalModuleInsideNonAmbientExternalModule.ts] ////

//// [ambientExternalModuleInsideNonAmbientExternalModule.ts]
export declare module "M" { }

//// [ambientExternalModuleInsideNonAmbientExternalModule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
