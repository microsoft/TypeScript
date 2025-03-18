//// [tests/cases/compiler/declarationEmitDistributiveConditionalWithInfer.ts] ////

//// [declarationEmitDistributiveConditionalWithInfer.ts]
// This function's type is changed on declaration
export const fun = (
    subFun: <Collection, Field extends keyof Collection>()
        => FlatArray<Collection[Field], 0>[]) => { };


//// [declarationEmitDistributiveConditionalWithInfer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fun = void 0;
const fun = (subFun) => { };
exports.fun = fun;
