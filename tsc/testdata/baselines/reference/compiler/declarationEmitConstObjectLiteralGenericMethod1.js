//// [tests/cases/compiler/declarationEmitConstObjectLiteralGenericMethod1.ts] ////

//// [declarationEmitConstObjectLiteralGenericMethod1.ts]
export const obj1 = {
    id<T>(value: T) {
        return value;
    },
    pair<T>(left: T, right: T) {
        return [left, right];
    },
} as const;


//// [declarationEmitConstObjectLiteralGenericMethod1.js]
export const obj1 = {
    id(value) {
        return value;
    },
    pair(left, right) {
        return [left, right];
    },
};


//// [declarationEmitConstObjectLiteralGenericMethod1.d.ts]
export declare const obj1: {
    id<T>(value: T): T;
    pair<T_1>(left: T_1, right: T_1): T_1[];
};
