//// [tests/cases/compiler/declarationEmitInferredUndefinedPropFromFunctionInArray.ts] ////

//// [declarationEmitInferredUndefinedPropFromFunctionInArray.ts]
// repro from https://github.com/microsoft/TypeScript/issues/53914

export let b = [{ foo: 0, m() {} }, { bar: 1 }];

//// [declarationEmitInferredUndefinedPropFromFunctionInArray.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
// repro from https://github.com/microsoft/TypeScript/issues/53914
exports.b = [{ foo: 0, m() { } }, { bar: 1 }];
