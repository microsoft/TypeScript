//// [tests/cases/conformance/types/spread/objectSpreadNegativeParse.ts] ////

//// [objectSpreadNegativeParse.ts]
let o7 = { ...o? };
let o8 = { ...*o };
let o9 = { ...matchMedia() { }};
let o10 = { ...get x() { return 12; }};


//// [objectSpreadNegativeParse.js]
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
var o7 = __assign({}, o ?  : );
var o8 = __assign({},  * o);
var o9 = __assign({}, matchMedia()), _a = void 0;
;
var o10 = __assign(__assign({}, get), { x: function () { return 12; } });
