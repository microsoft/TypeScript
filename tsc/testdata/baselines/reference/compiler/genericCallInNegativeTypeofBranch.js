//// [tests/cases/compiler/genericCallInNegativeTypeofBranch.ts] ////

//// [genericCallInNegativeTypeofBranch.ts]
declare function identity<T>(value: T): T;
function normalize(value: unknown) {
    return typeof value === "string" ? value : identity(value);
}


//// [genericCallInNegativeTypeofBranch.js]
"use strict";
function normalize(value) {
    return typeof value === "string" ? value : identity(value);
}
