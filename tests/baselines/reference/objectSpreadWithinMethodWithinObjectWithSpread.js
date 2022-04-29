//// [objectSpreadWithinMethodWithinObjectWithSpread.ts]
const obj = {};
const a = {
    ...obj,
    prop() {
        return {
            ...obj,
            metadata: 213
        };
    }
};


//// [objectSpreadWithinMethodWithinObjectWithSpread.js]
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
var obj = {};
var a = __assign(__assign({}, obj), { prop: function () {
        return __assign(__assign({}, obj), { metadata: 213 });
    } });
