//// [genericImplements.ts]
class A { a; };
class B { b; };
interface I {
    f<T extends A>(): T;
} // { f: () => { a; } }

// OK
class X implements I {  
    f<T extends B>(): T { return undefined; }
} // { f: () => { b; } }

// OK
class Y implements I {
    f<T extends A>(): T { return undefined; }
} // { f: () => { a; } }

// OK
class Z implements I {
    f<T>(): T { return undefined; }
} // { f: <T>() => T } 

//// [genericImplements.js]
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
    return A;
}());
;
var B = (function () {
    function B() {
    }
    return B;
}());
;
// OK
var X = (function () {
    function X() {
    }
    X.prototype.f = function () { return undefined; };
    __names(X.prototype, ["f"]);
    return X;
}()); // { f: () => { b; } }
// OK
var Y = (function () {
    function Y() {
    }
    Y.prototype.f = function () { return undefined; };
    __names(Y.prototype, ["f"]);
    return Y;
}()); // { f: () => { a; } }
// OK
var Z = (function () {
    function Z() {
    }
    Z.prototype.f = function () { return undefined; };
    __names(Z.prototype, ["f"]);
    return Z;
}()); // { f: <T>() => T } 
