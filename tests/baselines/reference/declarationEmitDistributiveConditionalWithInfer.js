//// [tests/cases/compiler/declarationEmitDistributiveConditionalWithInfer.ts] ////

//// [declarationEmitDistributiveConditionalWithInfer.ts]
// This function's type is changed on declaration
export const fun = (
    subFun: <Collection, Field extends keyof Collection>()
        => FlatArray<Collection[Field], 0>[]) => { };


//// [declarationEmitDistributiveConditionalWithInfer.js]
// This function's type is changed on declaration
export const fun = (subFun) => { };


//// [declarationEmitDistributiveConditionalWithInfer.d.ts]
export declare const fun: (subFun: <Collection, Field extends keyof Collection>() => FlatArray<Collection[Field], 0>[]) => void;
