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
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.m0 = function (a) {
        a.b;
    };
    proto_1.m1 = function (_a) {
        var a = _a.a;
        a.b;
    };
    proto_1.m2 = function (_a) {
        var a = _a[0];
        a.b;
    };
    return A;
}());
