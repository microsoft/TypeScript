//// [thisTypeAndConstraints.ts]
class A {
    self() {
        return this;
    }
}

function f<T extends A>(x: T) {
    function g<U extends T>(x: U) {
        x = x.self();
    }
    x = x.self();
}

class B<T extends A> {
    foo(x: T) {
        x = x.self();
    }
    bar<U extends T>(x: U) {
        x = x.self();
    }
}


//// [thisTypeAndConstraints.js]
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
    A.prototype.self = function () {
        return this;
    };
    __names(A.prototype, ["self"]);
    return A;
}());
function f(x) {
    function g(x) {
        x = x.self();
    }
    x = x.self();
}
var B = (function () {
    function B() {
    }
    B.prototype.foo = function (x) {
        x = x.self();
    };
    B.prototype.bar = function (x) {
        x = x.self();
    };
    __names(B.prototype, ["foo", "bar"]);
    return B;
}());
