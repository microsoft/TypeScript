//// [tests/cases/compiler/declarationEmitVariableBindingPatternsRetained.ts] ////

//// [declarationEmitVariableBindingPatternsRetained.ts]
const func = () => "ok"
const b = { a: func }
export const { a } = b
export const { a: q } = b

//// [declarationEmitVariableBindingPatternsRetained.js]
const func = () => "ok";
const b = { a: func };
export const { a } = b;
export const { a: q } = b;


//// [declarationEmitVariableBindingPatternsRetained.d.ts]
declare const func: () => string;
export declare const { a }: {
    a: typeof func;
};
export declare const { a: q }: {
    a: typeof func;
};
export {};
