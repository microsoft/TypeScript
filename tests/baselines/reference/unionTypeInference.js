//// [unionTypeInference.ts]
// Verify that inferences made *to* a type parameter in a union type are secondary
// to inferences made directly to that type parameter

function f<T>(x: T, y: string|T): T {
    return x;
}

var a1: number;
var a1 = f(1, 2);
var a2: number;
var a2 = f(1, "hello");
var a3: number;
var a3 = f(1, a1 || "hello");
var a4: any;
var a4 = f(undefined, "abc");

function g<T>(value: [string, T]): T {
    return value[1];
}

var b1: boolean;
var b1 = g(["string", true]);

function h<T>(x: string|boolean|T): T {
    return typeof x === "string" || typeof x === "boolean" ? undefined : x;
}

var c1: number;
var c1 = h(5);
var c2: string;
var c2 = h("abc");


//// [unionTypeInference.js]
// Verify that inferences made *to* a type parameter in a union type are secondary
// to inferences made directly to that type parameter
function f(x, y) {
    return x;
}
var a1;
var a1 = f(1, 2);
var a2;
var a2 = f(1, "hello");
var a3;
var a3 = f(1, a1 || "hello");
var a4;
var a4 = f(undefined, "abc");
function g(value) {
    return value[1];
}
var b1;
var b1 = g(["string", true]);
function h(x) {
    return typeof x === "string" || typeof x === "boolean" ? undefined : x;
}
var c1;
var c1 = h(5);
var c2;
var c2 = h("abc");
