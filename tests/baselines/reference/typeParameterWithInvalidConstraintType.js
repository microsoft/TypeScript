//// [typeParameterWithInvalidConstraintType.ts]
class A<T extends T> {
    foo() {
        var x: T;
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    }
}

//// [typeParameterWithInvalidConstraintType.js]
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
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
        var x;
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    };
    __names(A.prototype, ["foo"]);
    return A;
}());
