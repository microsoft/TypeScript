//// [callGenericFunctionWithZeroTypeArguments.ts]
// valid invocations of generic functions with no explicit type arguments provided 

function f<T>(x: T): T { return null; }
var r = f(1);

var f2 = <T>(x: T): T => { return null; }
var r2 = f2(1);

var f3: { <T>(x: T): T; }
var r3 = f3(1);

class C {
    f<T>(x: T): T {
        return null;
    }
}
var r4 = (new C()).f(1);

interface I {
    f<T>(x: T): T;
}
var i: I;
var r5 = i.f(1);

class C2<T> {
    f(x: T): T {
        return null;
    }
}
var r6 = (new C2()).f(1);

interface I2<T> {
    f(x: T): T;
}
var i2: I2<number>;
var r7 = i2.f(1);

//// [callGenericFunctionWithZeroTypeArguments.js]
// valid invocations of generic functions with no explicit type arguments provided 
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
function f(x) { return null; }
var r = f(1);
var f2 = function (x) { return null; };
var r2 = f2(1);
var f3;
var r3 = f3(1);
var C = (function () {
    function C() {
    }
    C.prototype.f = function (x) {
        return null;
    };
    __names(C.prototype, ["f"]);
    return C;
}());
var r4 = (new C()).f(1);
var i;
var r5 = i.f(1);
var C2 = (function () {
    function C2() {
    }
    C2.prototype.f = function (x) {
        return null;
    };
    __names(C2.prototype, ["f"]);
    return C2;
}());
var r6 = (new C2()).f(1);
var i2;
var r7 = i2.f(1);
