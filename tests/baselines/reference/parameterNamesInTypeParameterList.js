//// [parameterNamesInTypeParameterList.ts]
function f0<T extends typeof a>(a: T) {
	a.b;
}

function f1<T extends typeof a>({a}: {a:T}) {
	a.b;
}

function f2<T extends typeof a>([a]: T[]) {
	a.b;
}

class A {
	m0<T extends typeof a>(a: T) {
		a.b
	}
	m1<T extends typeof a>({a}: {a:T}) {
		a.b
	}
	m2<T extends typeof a>([a]: T[]) {
		a.b
	}
}

//// [parameterNamesInTypeParameterList.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function f0(a) {
    a.b;
}
function f1(_a) {
    var a = _a.a;
    a.b;
}
function f2(_a) {
    var _b = __read(_a, 1), a = _b[0];
    a.b;
}
var A = (function () {
    function A() {
    }
    A.prototype.m0 = function (a) {
        a.b;
    };
    A.prototype.m1 = function (_a) {
        var a = _a.a;
        a.b;
    };
    A.prototype.m2 = function (_a) {
        var _b = __read(_a, 1), a = _b[0];
        a.b;
    };
    return A;
}());
