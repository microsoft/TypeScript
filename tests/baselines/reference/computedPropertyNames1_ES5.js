//// [computedPropertyNames1_ES5.ts]
var v = {
    get [0 + 1]() { return 0 },
    set [0 + 1](v: string) { } //No error
}

//// [computedPropertyNames1_ES5.js]
var v = (_a = {}, _a[0 + 1] = Object.defineProperty({ get: function () { return 0; }, enumerable: true, configurable: true }), _a[0 + 1] = Object.defineProperty({ set: function (v) { }, enumerable: true, configurable: true }),
_a);
var _a;
