//// [tests/cases/compiler/expandoFunctionExpressionsWithDynamicNames.ts] ////

//// [expandoFunctionExpressionsWithDynamicNames.ts]
// https://github.com/microsoft/TypeScript/issues/54809

const s = "X";

export const expr = () => {}
expr[s] = 0

export const expr2 = function () {}
expr2[s] = 0


//// [expandoFunctionExpressionsWithDynamicNames.js]
// https://github.com/microsoft/TypeScript/issues/54809
const s = "X";
export const expr = () => { };
expr[s] = 0;
export const expr2 = function () { };
expr2[s] = 0;


//// [expandoFunctionExpressionsWithDynamicNames.d.ts]
export declare const expr: {
    (): void;
    X: number;
};
export declare const expr2: {
    (): void;
    X: number;
};
