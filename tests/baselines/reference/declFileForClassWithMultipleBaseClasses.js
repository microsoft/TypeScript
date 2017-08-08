//// [declFileForClassWithMultipleBaseClasses.ts]
class A {
    foo() { }
}

class B {
    bar() { }
}

interface I {
    baz();
}

interface J {
    bat();
}


class D implements I, J {
    baz() { }
    bat() { }
    foo() { }
    bar() { }
}

interface I extends A, B {
}

//// [declFileForClassWithMultipleBaseClasses.js]
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
    A.prototype.foo = function () { };
    __names(A.prototype, ["foo"]);
    return A;
}());
var B = (function () {
    function B() {
    }
    B.prototype.bar = function () { };
    __names(B.prototype, ["bar"]);
    return B;
}());
var D = (function () {
    function D() {
    }
    D.prototype.baz = function () { };
    D.prototype.bat = function () { };
    D.prototype.foo = function () { };
    D.prototype.bar = function () { };
    __names(D.prototype, ["baz", "bat", "foo", "bar"]);
    return D;
}());


//// [declFileForClassWithMultipleBaseClasses.d.ts]
declare class A {
    foo(): void;
}
declare class B {
    bar(): void;
}
interface I {
    baz(): any;
}
interface J {
    bat(): any;
}
declare class D implements I, J {
    baz(): void;
    bat(): void;
    foo(): void;
    bar(): void;
}
interface I extends A, B {
}
