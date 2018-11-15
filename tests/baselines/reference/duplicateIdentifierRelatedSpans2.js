//// [tests/cases/compiler/duplicateIdentifierRelatedSpans2.ts] ////

//// [file1.ts]
class A { }
class B { }
class C { }
class D { }
class E { }
class F { }
class G { }
class H { }
class I { }
//// [file2.ts]
class A { }
class B { }
class C { }
class D { }
class E { }
class F { }
class G { }
class H { }
class I { }


//// [file1.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
var E = /** @class */ (function () {
    function E() {
    }
    return E;
}());
var F = /** @class */ (function () {
    function F() {
    }
    return F;
}());
var G = /** @class */ (function () {
    function G() {
    }
    return G;
}());
var H = /** @class */ (function () {
    function H() {
    }
    return H;
}());
var I = /** @class */ (function () {
    function I() {
    }
    return I;
}());
//// [file2.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
var E = /** @class */ (function () {
    function E() {
    }
    return E;
}());
var F = /** @class */ (function () {
    function F() {
    }
    return F;
}());
var G = /** @class */ (function () {
    function G() {
    }
    return G;
}());
var H = /** @class */ (function () {
    function H() {
    }
    return H;
}());
var I = /** @class */ (function () {
    function I() {
    }
    return I;
}());
