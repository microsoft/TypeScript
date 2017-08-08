//// [classAbstractMethodInNonAbstractClass.ts]
class A {
    abstract foo();
}

class B {
    abstract foo() {}
}

//// [classAbstractMethodInNonAbstractClass.js]
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
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function () {
    function B() {
    }
    B.prototype.foo = function () { };
    __names(B.prototype, ["foo"]);
    return B;
}());
