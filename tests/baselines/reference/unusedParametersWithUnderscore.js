//// [unusedParametersWithUnderscore.ts]

function f(a, _b, c, ___, d,e___, _f) {
}


function f2({_a, __b}) {
}

function f3([_a, ,__b]) {
}

function f4(...arg) {
}

function f5(..._arg) {
}

function f6(arg?, _arg?) {
}

var f7 = _ => undefined;

var f8 = function (_) { };

//// [unusedParametersWithUnderscore.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function f(a, _b, c, ___, d, e___, _f) {
}
function f2(_c) {
    var _a = _c._a, __b = _c.__b;
}
function f3(_c) {
    var _d = __read(_c, 3), _a = _d[0], __b = _d[2];
}
function f4() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i - 0] = arguments[_i];
    }
}
function f5() {
    var _arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _arg[_i - 0] = arguments[_i];
    }
}
function f6(arg, _arg) {
}
var f7 = function (_) { return undefined; };
var f8 = function (_) { };
