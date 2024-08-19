//// [tests/cases/conformance/controlFlow/dependentDestructuredVariablesWithExport.ts] ////

//// [dependentDestructuredVariablesWithExport.ts]
// https://github.com/microsoft/TypeScript/issues/59652

declare function mutuallyEnabledPair(): {
    discriminator: true,
    value: string,
  } | {
    discriminator: false,
    value: null | undefined,
  }
  
  
  export const { discriminator, value: value59652 } = mutuallyEnabledPair()
  
  if (discriminator) {
    value59652;
  }

//// [dependentDestructuredVariablesWithExport.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/59652
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.value59652 = exports.discriminator = void 0;
exports.discriminator = (_a = mutuallyEnabledPair(), _a.discriminator), exports.value59652 = _a.value;
if (exports.discriminator) {
    exports.value59652;
}
