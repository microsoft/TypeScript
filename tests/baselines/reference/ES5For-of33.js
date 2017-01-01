//// [ES5For-of33.ts]
for (var v of ['a', 'b', 'c']) {
    console.log(v);
}

//// [ES5For-of33.js]
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
    for (var _a = __values(['a', 'b', 'c']), _b = _a.next(); !_b.done; _b = _a.next()) {
        var v = _b.value;
        console.log(v);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
    }
    finally { if (e_1) throw e_1.error; }
}
var e_1, _c;
//# sourceMappingURL=ES5For-of33.js.map