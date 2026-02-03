//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of37.ts] ////

//// [ES5For-of37.ts]
// https://github.com/microsoft/TypeScript/issues/30083

for (const i of [0, 1, 2, 3, 4]) {
    try {
        // Ensure catch binding for the following loop is reset per iteration:
        for (const j of [1, 2, 3]) {
            if (i === 2) {
                throw new Error('ERR');
            }
        }
        console.log(i);
    } catch (err) {
        console.log('E %s %s', i, err);
    }
}

//// [ES5For-of37.js]
// https://github.com/microsoft/TypeScript/issues/30083
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
var e_1, _a, e_2, _b;
try {
    for (var _c = __values([0, 1, 2, 3, 4]), _d = _c.next(); !_d.done; _d = _c.next()) {
        var i = _d.value;
        try {
            try {
                // Ensure catch binding for the following loop is reset per iteration:
                for (var _e = (e_2 = void 0, __values([1, 2, 3])), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var j = _f.value;
                    if (i === 2) {
                        throw new Error('ERR');
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            console.log(i);
        }
        catch (err) {
            console.log('E %s %s', i, err);
        }
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
    }
    finally { if (e_1) throw e_1.error; }
}
