//// [restElementWithNullInitializer.ts]
function foo1([...r] = null) {
}

function foo2([...r] = undefined) {
}

function foo3([...r] = {}) {
}

function foo4([...r] = []) {
}


//// [restElementWithNullInitializer.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function foo1(_a) {
    var _b = __read(_a === void 0 ? null : _a), r = _b.slice(0);
}
function foo2(_a) {
    var _b = __read(_a === void 0 ? undefined : _a), r = _b.slice(0);
}
function foo3(_a) {
    var _b = __read(_a === void 0 ? {} : _a), r = _b.slice(0);
}
function foo4(_a) {
    var _b = __read(_a === void 0 ? [] : _a), r = _b.slice(0);
}
