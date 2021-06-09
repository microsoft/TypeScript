//// [nonNullableReduction.ts]
// Repros from #43425

type Transform1<T> = ((value: string) => T) | (string extends T ? undefined : never);
type Transform2<T> = string extends T ? ((value: string) => T) | undefined : (value: string) => T;

function test<T>(f1: Transform1<T>, f2: Transform2<T>) {
    f1?.("hello");
    f2?.("hello");
}

function f1<T>(x: T | (string extends T ? null | undefined : never)) {
    let z = x!;  // NonNullable<T>
}

function f2<T, U extends null | undefined>(x: T | U) {
    let z = x!;  // NonNullable<T>
}


//// [nonNullableReduction.js]
"use strict";
// Repros from #43425
function test(f1, f2) {
    f1 === null || f1 === void 0 ? void 0 : f1("hello");
    f2 === null || f2 === void 0 ? void 0 : f2("hello");
}
function f1(x) {
    var z = x; // NonNullable<T>
}
function f2(x) {
    var z = x; // NonNullable<T>
}
