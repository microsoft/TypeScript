//// [tests/cases/conformance/expressions/typeGuards/typeGuardOfFormFunctionEquality.ts] ////

//// [typeGuardOfFormFunctionEquality.ts]
declare function isString1(a: number, b: Object): b is string;

declare function isString2(a: Object): a is string;

switch (isString1(0, "")) {
    case isString2(""):
    default:
}

var x = isString1(0, "") === isString2("");

function isString3(a: number, b: number, c: Object): c is string {
    return isString1(0, c);
}


//// [typeGuardOfFormFunctionEquality.js]
switch (isString1(0, "")) {
    case isString2(""):
    default:
}
var x = isString1(0, "") === isString2("");
function isString3(a, b, c) {
    return isString1(0, c);
}
