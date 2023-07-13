//// [tests/cases/compiler/declarationEmitInferredUndefinedPropFromFunctionInArray.ts] ////

//// [declarationEmitInferredUndefinedPropFromFunctionInArray.ts]
// repro from https://github.com/microsoft/TypeScript/issues/53914

export let b = [{ foo: 0, m() {} }, { bar: 1 }];

//// [declarationEmitInferredUndefinedPropFromFunctionInArray.js]
"use strict";
// repro from https://github.com/microsoft/TypeScript/issues/53914
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = [{ foo: 0, m: function () { } }, { bar: 1 }];


//// [declarationEmitInferredUndefinedPropFromFunctionInArray.d.ts]
export declare let b: ({
    foo: number;
    m(): void;
    bar?: undefined;
} | {
    bar: number;
    foo?: undefined;
    m?: undefined;
})[];
