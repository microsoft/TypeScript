//// [ES5For-of35.ts]
for (const {x: a = 0, y: b = 1} of [2, 3]) {
    a;
    b;
}

//// [ES5For-of35.js]
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
try {
    for (var _a = __values([2, 3]), _b = _a.next(); !_b.done; _b = _a.next()) {
        var _c = _b.value, _d = _c.x, a = _d === void 0 ? 0 : _d, _e = _c.y, b = _e === void 0 ? 1 : _e;
        a;
        b;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_b && !_b.done && (_f = _a["return"])) _f.call(_a);
    }
    finally { if (e_1) throw e_1.error; }
}
var e_1, _f;
//# sourceMappingURL=ES5For-of35.js.map