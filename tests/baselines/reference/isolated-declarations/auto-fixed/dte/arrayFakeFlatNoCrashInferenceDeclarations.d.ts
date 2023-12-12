//// [tests/cases/compiler/arrayFakeFlatNoCrashInferenceDeclarations.ts] ////

//// [arrayFakeFlatNoCrashInferenceDeclarations.ts]
type BadFlatArray<Arr, Depth extends number> = {obj: {
    "done": Arr,
    "recur": Arr extends ReadonlyArray<infer InnerArr>
    ? BadFlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
    : Arr
}[Depth extends -1 ? "done" : "recur"]}["obj"];

declare function flat<A, D extends number = 1>(
    arr: A,
    depth?: D
): BadFlatArray<A, D>[]

function foo<T>(arr: T[], depth: number) {
    return flat(arr, depth);
}

/// [Declarations] ////



//// [arrayFakeFlatNoCrashInferenceDeclarations.d.ts]
type BadFlatArray<Arr, Depth extends number> = {
    obj: {
        "done": Arr;
        "recur": Arr extends ReadonlyArray<infer InnerArr> ? BadFlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]> : Arr;
    }[Depth extends -1 ? "done" : "recur"];
}["obj"];
declare function flat<A, D extends number = 1>(arr: A, depth?: D): BadFlatArray<A, D>[];
declare function foo<T>(arr: T[], depth: number): invalid;
//# sourceMappingURL=arrayFakeFlatNoCrashInferenceDeclarations.d.ts.map
/// [Errors] ////

arrayFakeFlatNoCrashInferenceDeclarations.ts(13,10): error TS5088: The inferred type of 'foo' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.
arrayFakeFlatNoCrashInferenceDeclarations.ts(13,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.


==== arrayFakeFlatNoCrashInferenceDeclarations.ts (2 errors) ====
    type BadFlatArray<Arr, Depth extends number> = {obj: {
        "done": Arr,
        "recur": Arr extends ReadonlyArray<infer InnerArr>
        ? BadFlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
        : Arr
    }[Depth extends -1 ? "done" : "recur"]}["obj"];
    
    declare function flat<A, D extends number = 1>(
        arr: A,
        depth?: D
    ): BadFlatArray<A, D>[]
    
    function foo<T>(arr: T[], depth: number) {
             ~~~
!!! error TS5088: The inferred type of 'foo' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.
             ~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 arrayFakeFlatNoCrashInferenceDeclarations.ts:13:10: Add a return type to the function declaration.
        return flat(arr, depth);
    }