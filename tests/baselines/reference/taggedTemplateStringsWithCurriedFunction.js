//// [taggedTemplateStringsWithCurriedFunction.ts]
// Originated from #38558

const f = _ => (..._) => "";

f({ ...{ x: 0 } })``;
f({ ...{ x: 0 } })`x`;
f({ ...{ x: 0 } })`x${f}x`;
f({ ...{ x: 0 }, y: (() => 1)() })``;
f({ x: (() => 1)(), ...{ y: 1 } })``;


//// [taggedTemplateStringsWithCurriedFunction.js]
// Originated from #38558
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var f = function (_) { return function () {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    return "";
}; };
f(__assign({ x: 0 }))(__makeTemplateObject([""], [""]));
f(__assign({ x: 0 }))(__makeTemplateObject(["x"], ["x"]));
f(__assign({ x: 0 }))(__makeTemplateObject(["x", "x"], ["x", "x"]), f);
f(__assign({ x: 0 }, { y: (function () { return 1; })() }))(__makeTemplateObject([""], [""]));
f(__assign({ x: (function () { return 1; })() }, { y: 1 }))(__makeTemplateObject([""], [""]));
