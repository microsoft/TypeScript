//// [spreadIntersection.ts]
var intersection: { a: number } & { b: string };

var o1: { a: number, b: string };
var o1 = { ...intersection };

var o2: { a: number, b: string, c: boolean };
var o2 = { ...intersection, c: false };

//// [spreadIntersection.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var intersection;
var o1;
var o1 = __assign({}, intersection);
var o2;
var o2 = __assign(__assign({}, intersection), { c: false });
