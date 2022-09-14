//// [declarationEmitDuplicateParameterDestructuring.ts]
export const fn1 = ({ prop: a, prop: b }: { prop: number }) => a + b;

export const fn2 = ({ prop: a }: { prop: number }, { prop: b }: { prop: number }) => a + b;




//// [declarationEmitDuplicateParameterDestructuring.d.ts]
export declare const fn1: ({ prop, prop }: {
    prop: number;
}) => number;
export declare const fn2: ({ prop }: {
    prop: number;
}, { prop }: {
    prop: number;
}) => number;


//// [DtsFileErrors]


tests/cases/compiler/declarationEmitDuplicateParameterDestructuring.d.ts(1,30): error TS2300: Duplicate identifier 'prop'.
tests/cases/compiler/declarationEmitDuplicateParameterDestructuring.d.ts(1,36): error TS2300: Duplicate identifier 'prop'.
tests/cases/compiler/declarationEmitDuplicateParameterDestructuring.d.ts(4,30): error TS2300: Duplicate identifier 'prop'.
tests/cases/compiler/declarationEmitDuplicateParameterDestructuring.d.ts(6,6): error TS2300: Duplicate identifier 'prop'.


==== tests/cases/compiler/declarationEmitDuplicateParameterDestructuring.d.ts (4 errors) ====
    export declare const fn1: ({ prop, prop }: {
                                 ~~~~
!!! error TS2300: Duplicate identifier 'prop'.
                                       ~~~~
!!! error TS2300: Duplicate identifier 'prop'.
        prop: number;
    }) => number;
    export declare const fn2: ({ prop }: {
                                 ~~~~
!!! error TS2300: Duplicate identifier 'prop'.
        prop: number;
    }, { prop }: {
         ~~~~
!!! error TS2300: Duplicate identifier 'prop'.
        prop: number;
    }) => number;
    