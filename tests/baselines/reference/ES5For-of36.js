//// [ES5For-of36.ts]
for (let [a = 0, b = 1] of [2, 3]) {
    a;
    b;
}

//// [ES5For-of36.js]
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
try {
    for (var _a = __values([2, 3]), _b = _a.next(); !_b.done; _b = _a.next()) {
        var _c = __read(_b.value, 2), _d = _c[0], a = _d === void 0 ? 0 : _d, _e = _c[1], b = _e === void 0 ? 1 : _e;
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
//# sourceMappingURL=ES5For-of36.js.map