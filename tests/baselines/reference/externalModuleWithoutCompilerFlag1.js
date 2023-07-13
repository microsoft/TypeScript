//// [tests/cases/compiler/externalModuleWithoutCompilerFlag1.ts] ////

//// [externalModuleWithoutCompilerFlag1.ts]
// Not on line 0 because we want to verify the error is placed in the appropriate location.
  export module M {
}

//// [externalModuleWithoutCompilerFlag1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
