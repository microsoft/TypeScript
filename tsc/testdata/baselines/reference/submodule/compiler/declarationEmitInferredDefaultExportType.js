//// [tests/cases/compiler/declarationEmitInferredDefaultExportType.ts] ////

//// [declarationEmitInferredDefaultExportType.ts]
// test.ts
export default {
  foo: [],
  bar: undefined,
  baz: null
}

//// [declarationEmitInferredDefaultExportType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    foo: [],
    bar: undefined,
    baz: null
};
