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

//// [arrayFakeFlatNoCrashInferenceDeclarations.js]
"use strict";
function foo(arr, depth) {
    return flat(arr, depth);
}


//// [arrayFakeFlatNoCrashInferenceDeclarations.d.ts]
type _recursive<InnerArr> = InnerArr | (InnerArr extends readonly (infer InnerArr)[] ? _recursive<InnerArr> : InnerArr);
type BadFlatArray<Arr, Depth extends number> = {
    obj: {
        "done": Arr;
        "recur": Arr extends ReadonlyArray<infer InnerArr> ? BadFlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]> : Arr;
    }[Depth extends -1 ? "done" : "recur"];
}["obj"];
declare function flat<A, D extends number = 1>(arr: A, depth?: D): BadFlatArray<A, D>[];
declare function foo<T>(arr: T[], depth: number): (T | (T extends readonly (infer InnerArr)[] ? _recursive<InnerArr> : T))[];
