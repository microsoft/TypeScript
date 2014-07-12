//// [mismatchedExplicitTypeParameterAndArgumentType.js]
function map(xs, f) {
    var ys = [];
    xs.forEach(function (x) {
        return ys.push(f(x));
    });
    return ys;
}

var r0 = map([1, ""], function (x) {
    return x.toString();
});
var r5 = map([1, ""], function (x) {
    return x.toString();
});
var r6 = map([1, ""], function (x) {
    return x.toString();
});
var r7 = map([1, ""], function (x) {
    return x.toString();
});
var r7b = map([1, ""], function (x) {
    return x.toString();
});
var r8 = map([1, ""], function (x) {
    return x.toString();
});
