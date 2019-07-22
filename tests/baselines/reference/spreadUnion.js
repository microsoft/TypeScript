//// [spreadUnion.ts]
var union: { a: number } | { b: string };

var o3: { a: number } | { b: string };
var o3 =  { ...union };

var o4: { a: boolean } | { b: string , a: boolean};
var o4 =  { ...union, a: false };

var o5: { a: number } | { b: string } | { a: number, b: string };
var o5 =  { ...union, ...union };

//// [spreadUnion.js]
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
var union;
var o3;
var o3 = __assign({}, union);
var o4;
var o4 = __assign(__assign({}, union), { a: false });
var o5;
var o5 = __assign(__assign({}, union), union);
