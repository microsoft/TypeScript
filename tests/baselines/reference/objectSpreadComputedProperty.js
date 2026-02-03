//// [tests/cases/conformance/types/spread/objectSpreadComputedProperty.ts] ////

//// [objectSpreadComputedProperty.ts]
// fixes #12200
function f() {
    let n: number = 12;
    let m: number = 13;
    let a: any = null;
    const o1 = { ...{}, [n]: n };
    const o2 = { ...{}, [a]: n };
    const o3 = { [a]: n, ...{}, [n]: n, ...{}, [m]: m };
}


//// [objectSpreadComputedProperty.js]
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
// fixes #12200
function f() {
    let n = 12;
    let m = 13;
    let a = null;
    const o1 = __assign({}, { [n]: n });
    const o2 = __assign({}, { [a]: n });
    const o3 = __assign(__assign(__assign(__assign({ [a]: n }, {}), { [n]: n }), {}), { [m]: m });
}
