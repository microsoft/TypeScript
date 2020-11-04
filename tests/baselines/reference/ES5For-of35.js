//// [ES5For-of35.ts]
for (const {x: a = 0, y: b = 1} of [2, 3]) {
    a;
    b;
}

//// [ES5For-of35.js]
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a;
try {
    for (var _b = __values([2, 3]), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = _c.value, _e = _d.x, a = _e === void 0 ? 0 : _e, _f = _d.y, b = _f === void 0 ? 1 : _f;
        a;
        b;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
    }
    finally { if (e_1) throw e_1.error; }
}
//# sourceMappingURL=ES5For-of35.js.map