//// [computedPropertyNames6_ES5.ts]
var p1: number | string;
var p2: number | number[];
var p3: string | boolean;
var v = {
    [p1]: 0,
    [p2]: 1,
    [p3]: 2
}

//// [computedPropertyNames6_ES5.js]
var _a;
var p1;
var p2;
var p3;
var v = (_a = {},
    _a[p1] = 0,
    _a[p2] = 1,
    _a[p3] = 2,
    _a);
