//// [tests/cases/compiler/arrowFunctionReturnTypeErrorSpan.ts] ////

//// [arrowFunctionReturnTypeErrorSpan.ts]
// block body
const a = (): number => {
  return "foo";
};

const a = (): number => {
  return missing;
};

// expression body
const b = (): number => "foo";

type F<T> = T;
const c = (): F<number> => "foo";

const d = (): number => missing;


//// [arrowFunctionReturnTypeErrorSpan.js]
// block body
var a = function () {
    return "foo";
};
var a = function () {
    return missing;
};
// expression body
var b = function () { return "foo"; };
var c = function () { return "foo"; };
var d = function () { return missing; };
