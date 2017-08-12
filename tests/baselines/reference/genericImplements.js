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
    var proto_1 = X.prototype;
    proto_1.f = function () { return undefined; };
    return X;
}()); // { f: () => { b; } }
// OK
var Y = (function () {
    function Y() {
    }
    var proto_2 = Y.prototype;
    proto_2.f = function () { return undefined; };
    return Y;
}()); // { f: () => { a; } }
// OK
var Z = (function () {
    function Z() {
    }
    var proto_3 = Z.prototype;
    proto_3.f = function () { return undefined; };
    return Z;
}()); // { f: <T>() => T } 
