//// [tests/cases/compiler/narrowLiteralUnionByTypePredicate.ts] ////

//// [narrowLiteralUnionByTypePredicate.ts]
type Source = "a" | "b" | "c" | "d" | 1 | 2 | 3 | 4;
type Candidate = "b" | "d" | 1 | 3;

declare const source: Source;
declare function isCandidate(value: Source): value is Candidate;

if (isCandidate(source)) {
    source;
}

enum E {
    A = "a",
    B = "b",
}

declare const enumSource: "a" | "b";
declare function isEnumA(value: "a" | "b"): value is E.A;

if (isEnumA(enumSource)) {
    const enumA: E.A = enumSource;
}


//// [narrowLiteralUnionByTypePredicate.js]
"use strict";
if (isCandidate(source)) {
    source;
}
var E;
(function (E) {
    E["A"] = "a";
    E["B"] = "b";
})(E || (E = {}));
if (isEnumA(enumSource)) {
    const enumA = enumSource;
}
