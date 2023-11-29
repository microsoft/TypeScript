//// [tests/cases/compiler/typePredicatesOptionalChaining1.ts] ////

//// [typePredicatesOptionalChaining1.ts]
type X = {
  y?: {
    z?: string;
  };
};
const x: X = {
  y: {},
};
// type guard
function isNotNull<A>(x: A): x is NonNullable<A> {
  return x !== null && x !== undefined;
}
// function which I want to call in the result of the expression
function title(str: string) {
  return str.length > 0 ? "Dear " + str : "Dear nobody";
}

isNotNull(x?.y?.z) ? title(x.y.z) : null; // should not error


//// [typePredicatesOptionalChaining1.js]
"use strict";
var _a;
var x = {
    y: {},
};
// type guard
function isNotNull(x) {
    return x !== null && x !== undefined;
}
// function which I want to call in the result of the expression
function title(str) {
    return str.length > 0 ? "Dear " + str : "Dear nobody";
}
isNotNull((_a = x === null || x === void 0 ? void 0 : x.y) === null || _a === void 0 ? void 0 : _a.z) ? title(x.y.z) : null; // should not error
