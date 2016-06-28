//// [memberFunctionOverloadMixingStaticAndInstance.ts]
class C {
    foo();
    static foo(); // error
}

class D {
    static foo();
    foo(); // error    
}

class E<T> {
    foo(x: T);
    static foo(x: number); // error
}

class F<T> {
    static foo(x: number);
    foo(x: T); // error    
}

//// [memberFunctionOverloadMixingStaticAndInstance.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function () {
    function D() {
    }
    return D;
}());
var E = (function () {
    function E() {
    }
    return E;
}());
var F = (function () {
    function F() {
    }
    return F;
}());
