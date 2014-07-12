//// [typeofTypeParameter.ts]
function f<T>(x: T): T {
    var a: typeof x;
    var y: typeof T;
    return a;
}

//// [typeofTypeParameter.js]
function f(x) {
    var a;
    var y;
    return a;
}
