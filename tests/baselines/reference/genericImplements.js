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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
;
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
;
// OK
var X = /** @class */ (function () {
    function X() {
    }
    X.prototype.f = function () { return undefined; };
    return X;
}()); // { f: () => { b; } }
// OK
var Y = /** @class */ (function () {
    function Y() {
    }
    Y.prototype.f = function () { return undefined; };
    return Y;
}()); // { f: () => { a; } }
// OK
var Z = /** @class */ (function () {
    function Z() {
    }
    Z.prototype.f = function () { return undefined; };
    return Z;
}()); // { f: <T>() => T } 
