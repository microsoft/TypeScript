//// [classAbstractOverloads.ts]
abstract class A {
    abstract foo();
    abstract foo() : number;
    abstract foo();
    
    abstract bar();
    bar();
    abstract bar();
    
    abstract baz();
    baz();
    abstract baz();
    baz() {}
    
    qux();
}

abstract class B {
    abstract foo() : number;
    abstract foo();
    x : number;
    abstract foo();
    abstract foo();
}

//// [classAbstractOverloads.js]
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
    A.prototype.baz = function () { };
    __names(A.prototype, ["baz"]);
    return A;
}());
var B = (function () {
    function B() {
    }
    return B;
}());
