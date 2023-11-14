//// [tests/cases/compiler/expandoFunctionExpressionsWithDynamicNames.ts] ////

//// [expandoFunctionExpressionsWithDynamicNames.ts]
// https://github.com/microsoft/TypeScript/issues/54809

const s = "X";

export const expr = (): void => {}
expr[s] = 0

export const expr2 = function (): void {}
expr2[s] = 0


/// [Declarations] ////



//// [expandoFunctionExpressionsWithDynamicNames.d.ts]
export declare const expr: {
    (): void;
    X: number;
};
export declare const expr2: {
    (): void;
    X: number;
};
//# sourceMappingURL=expandoFunctionExpressionsWithDynamicNames.d.ts.map