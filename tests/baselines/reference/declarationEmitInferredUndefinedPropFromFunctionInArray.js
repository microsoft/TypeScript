//// [tests/cases/compiler/declarationEmitInferredUndefinedPropFromFunctionInArray.ts] ////

//// [declarationEmitInferredUndefinedPropFromFunctionInArray.ts]
// repro from https://github.com/microsoft/TypeScript/issues/53914

export let b = [{ foo: 0, m() {} }, { bar: 1 }];

//// [declarationEmitInferredUndefinedPropFromFunctionInArray.js]
// repro from https://github.com/microsoft/TypeScript/issues/53914
export let b = [{ foo: 0, m() { } }, { bar: 1 }];


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
