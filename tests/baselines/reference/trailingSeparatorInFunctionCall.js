//// [trailingSeparatorInFunctionCall.ts]
function f(x, y) {
}

f(1, 2, );

function f2<T>(x: T, y: T) {
}

f2(1, 2, );

//// [trailingSeparatorInFunctionCall.js]
function f(x, y) {
}
f(1, 2);
function f2(x, y) {
}
f2(1, 2);
