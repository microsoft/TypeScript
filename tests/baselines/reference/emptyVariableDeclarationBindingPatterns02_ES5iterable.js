//// [emptyVariableDeclarationBindingPatterns02_ES5iterable.ts]
(function () {
    var {};
    let {};
    const {};

    var [];
    let [];
    const [];
})();

//// [emptyVariableDeclarationBindingPatterns02_ES5iterable.js]
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
(function () {
    var _a = void 0;
    var _b = void 0;
    var _c = void 0;
    var _d = __read(void 0, 0);
    var _e = __read(void 0, 0);
    var _f = __read(void 0, 0);
})();


//// [emptyVariableDeclarationBindingPatterns02_ES5iterable.d.ts]
