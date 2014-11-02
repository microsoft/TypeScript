// Verify that inferences made *to* a type parameter in a union type are secondary
// to inferences made directly to that type parameter

function f<T>(x: T, y: string|T): T {
    return x;
}
function g<T>(value: [string, T]): T {
    return value[1];
}

var a: number;
var a = f(1, 2);
var b: number;
var b = f(1, "hello");
var c: number;
var c = f(1, a || "hello");
var d: any;
var d = f(undefined, "abc");
var e: boolean;
var e = g(["string", true]);
