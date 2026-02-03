//// [tests/cases/compiler/parameterNamesInTypeParameterList.ts] ////

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
function f0(a) {
    a.b;
}
function f1(_a) {
    var a = _a.a;
    a.b;
}
function f2(_a) {
    var a = _a[0];
    a.b;
}
var A = /** @class */ (function () {
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
        var a = _a[0];
        a.b;
    };
    return A;
}());
