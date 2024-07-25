//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesOverloadAssignability04.ts] ////

//// [stringLiteralTypesOverloadAssignability04.ts]
function f(x: "foo"): number;
function f(x: "foo"): number {
    return 0;
}

function g(x: "foo"): number;
function g(x: "foo"): number {
    return 0;
}

let a = f;
let b = g;

a = b;
b = a;

//// [stringLiteralTypesOverloadAssignability04.js]
function f(x) {
    return 0;
}
function g(x) {
    return 0;
}
var a = f;
var b = g;
a = b;
b = a;


//// [stringLiteralTypesOverloadAssignability04.d.ts]
declare function f(x: "foo"): number;
declare function g(x: "foo"): number;
declare let a: typeof f;
declare let b: typeof g;
