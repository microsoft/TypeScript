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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
    __names(A.prototype, ["m0", "m1", "m2"]);
    return A;
}());
