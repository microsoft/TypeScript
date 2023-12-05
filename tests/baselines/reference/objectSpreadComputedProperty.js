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
    var _a, _b, _c, _d, _e;
    var n = 12;
    var m = 13;
    var a = null;
    var o1 = __assign({}, (_a = {}, _a[n] = n, _a));
    var o2 = __assign({}, (_b = {}, _b[a] = n, _b));
    var o3 = __assign(__assign(__assign(__assign((_c = {}, _c[a] = n, _c), {}), (_d = {}, _d[n] = n, _d)), {}), (_e = {}, _e[m] = m, _e));
}
