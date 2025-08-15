//// [tests/cases/compiler/taggedTemplateStringsWithCurriedFunction.ts] ////

//// [taggedTemplateStringsWithCurriedFunction.ts]
// Originated from #38558

const f = _ => (..._) => "";

f({ ...{ x: 0 } })``;
f({ ...{ x: 0 } })`x`;
f({ ...{ x: 0 } })`x${f}x`;
f({ ...{ x: 0 }, y: (() => 1)() })``;
f({ x: (() => 1)(), ...{ y: 1 } })``;


//// [taggedTemplateStringsWithCurriedFunction.js]
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
// Originated from #38558
const f = _ => (..._) => "";
f(__assign({ x: 0 })) ``;
f(__assign({ x: 0 })) `x`;
f(__assign({ x: 0 })) `x${f}x`;
f(__assign({ x: 0 }, { y: (() => 1)() })) ``;
f(__assign({ x: (() => 1)() }, { y: 1 })) ``;
