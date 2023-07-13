//// [tests/cases/compiler/mismatchedExplicitTypeParameterAndArgumentType.ts] ////

//// [mismatchedExplicitTypeParameterAndArgumentType.ts]
function map<T, U>(xs: T[], f: (x: T) => U) {
    var ys: U[] = [];
    xs.forEach(x => ys.push(f(x)));
    return ys;
}

var r0 = map([1, ""], (x) => x.toString());
var r5 = map<any, any>([1, ""], (x) => x.toString());
var r6 = map<Object, Object>([1, ""], (x) => x.toString());
var r7 = map<number, string>([1, ""], (x) => x.toString()); // error
var r7b = map<number>([1, ""], (x) => x.toString()); // error
var r8 = map<any, string>([1, ""], (x) => x.toString());

//// [mismatchedExplicitTypeParameterAndArgumentType.js]
function map(xs, f) {
    var ys = [];
    xs.forEach(function (x) { return ys.push(f(x)); });
    return ys;
}
var r0 = map([1, ""], function (x) { return x.toString(); });
var r5 = map([1, ""], function (x) { return x.toString(); });
var r6 = map([1, ""], function (x) { return x.toString(); });
var r7 = map([1, ""], function (x) { return x.toString(); }); // error
var r7b = map([1, ""], function (x) { return x.toString(); }); // error
var r8 = map([1, ""], function (x) { return x.toString(); });
