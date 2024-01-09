//// [tests/cases/compiler/declarationEmitDuplicateParameterDestructuring.ts] ////

//// [declarationEmitDuplicateParameterDestructuring.ts]
export const fn1 = ({ prop: a, prop: b }: { prop: number }): number => a + b;

export const fn2 = ({ prop: a }: { prop: number }, { prop: b }: { prop: number }): number => a + b;


/// [Declarations] ////



//// [declarationEmitDuplicateParameterDestructuring.d.ts]
export declare const fn1: ({ prop, prop }: {
    prop: number;
}) => number;
export declare const fn2: ({ prop }: {
    prop: number;
}, { prop }: {
    prop: number;
}) => number;
//# sourceMappingURL=declarationEmitDuplicateParameterDestructuring.d.ts.map