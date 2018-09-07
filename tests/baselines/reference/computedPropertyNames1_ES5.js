//// [computedPropertyNames1_ES5.ts]
var v = {
    get [0 + 1]() { return 0 },
    set [0 + 1](v: string) { } //No error
}

//// [computedPropertyNames1_ES5.js]
var _a;
var v = (_a = {},
    Object.defineProperty(_a, 0 + 1, {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    }),
    Object.defineProperty(_a, 0 + 1, {
        set: function (v) { } //No error
        ,
        enumerable: true,
        configurable: true
    }),
    _a);
