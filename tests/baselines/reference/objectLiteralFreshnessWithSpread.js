//// [tests/cases/compiler/objectLiteralFreshnessWithSpread.ts] ////

//// [objectLiteralFreshnessWithSpread.ts]
let x = { b: 1, extra: 2 }
let xx: { a, b }  = { a: 1, ...x, z: 3 } // error for 'z', no error for 'extra'


//// [objectLiteralFreshnessWithSpread.js]
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
var x = { b: 1, extra: 2 };
var xx = __assign(__assign({ a: 1 }, x), { z: 3 }); // error for 'z', no error for 'extra'
