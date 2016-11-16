//// [emptyVariableDeclarationBindingPatterns02_ES5.ts]

(function () {
    var {};
    let {};
    const {};

    var [];
    let [];
    const [];
})();

//// [emptyVariableDeclarationBindingPatterns02_ES5.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
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


//// [emptyVariableDeclarationBindingPatterns02_ES5.d.ts]
