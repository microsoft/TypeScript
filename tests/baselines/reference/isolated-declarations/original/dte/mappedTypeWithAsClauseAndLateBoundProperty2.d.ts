//// [tests/cases/compiler/mappedTypeWithAsClauseAndLateBoundProperty2.ts] ////

//// [mappedTypeWithAsClauseAndLateBoundProperty2.ts]
export const thing = (null as any as { [K in keyof number[] as Exclude<K, "length">]: (number[])[K] });


/// [Declarations] ////



//// [mappedTypeWithAsClauseAndLateBoundProperty2.d.ts]
export declare const thing: {
    [K in keyof number[] as Exclude<K, "length">]: (number[])[K];
};
