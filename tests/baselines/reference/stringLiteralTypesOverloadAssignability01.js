//// [stringLiteralTypesOverloadAssignability01.ts]
function f(x: "foo"): number;
function f(x: string): number {
    return 0;
}

function g(x: "bar"): number;
function g(x: string): number {
    return 0;
}

let a = f;
let b = g;

a = b;
b = a;

//// [stringLiteralTypesOverloadAssignability01.js]
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


//// [stringLiteralTypesOverloadAssignability01.d.ts]
declare function f(x: "foo"): number;
declare function g(x: "bar"): number;
declare let a: typeof f;
declare let b: typeof g;
