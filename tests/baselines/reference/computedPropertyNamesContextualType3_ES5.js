//// [computedPropertyNamesContextualType3_ES5.ts]
interface I {
    [s: string]: (x: string) => number;
}

var o: I = {
    [+"foo"](y) { return y.length; },
    [+"bar"]: y => y.length
}

//// [computedPropertyNamesContextualType3_ES5.js]
var o = function (y) {
    return y.length;
}(_a = {}, _a[+"foo"] = , _a[+"bar"] = function (y) { return y.length; }, _a);
var _a;
