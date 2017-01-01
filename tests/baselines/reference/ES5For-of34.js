//// [ES5For-of34.ts]
function foo() {
    return { x: 0 };
}
for (foo().x of ['a', 'b', 'c']) {
    var p = foo().x;
}

//// [ES5For-of34.js]
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
function foo() {
    return { x: 0 };
}
try {
    for (var _a = __values(['a', 'b', 'c']), _b = _a.next(); !_b.done; _b = _a.next()) {
        foo().x = _b.value;
        var p = foo().x;
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
//# sourceMappingURL=ES5For-of34.js.map