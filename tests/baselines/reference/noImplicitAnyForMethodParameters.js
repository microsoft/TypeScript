//// [noImplicitAnyForMethodParameters.ts]
declare class A {
    private foo(a); // OK - ambient class and private method - no error
}

declare class B {
    public foo(a); // OK - ambient class and public method - error
}

class C {
    private foo(a) { } // OK - non-ambient class and private method - error
}
class D {
    public foo(a) { } // OK - non-ambient class and public method - error
}

//// [noImplicitAnyForMethodParameters.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (a) { }; // OK - non-ambient class and private method - error
    __names(C.prototype, ["foo"]);
    return C;
}());
var D = (function () {
    function D() {
    }
    D.prototype.foo = function (a) { }; // OK - non-ambient class and public method - error
    __names(D.prototype, ["foo"]);
    return D;
}());
