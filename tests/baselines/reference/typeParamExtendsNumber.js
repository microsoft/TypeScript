//// [typeParamExtendsNumber.ts]
function f<T extends number>() {
    var t: T;
    var v = {
        [t]: 0
    }
    return t + t;
}


//// [typeParamExtendsNumber.js]
function f() {
    var t;
    var v = (_a = {},
        _a[t] = 0,
        _a);
    return t + t;
    var _a;
}
