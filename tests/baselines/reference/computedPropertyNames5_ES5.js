//// [computedPropertyNames5_ES5.ts]
var b: boolean;
var v = {
    [b]: 0,
    [true]: 1,
    [[]]: 0,
    [{}]: 0,
    [undefined]: undefined,
    [null]: null
}

//// [computedPropertyNames5_ES5.js]
var _a;
var b;
var v = (_a = {},
    _a[b] = 0,
    _a[true] = 1,
    _a[[]] = 0,
    _a[{}] = 0,
    _a[undefined] = undefined,
    _a[null] = null,
    _a);
