//// [classImplementsClass3.ts]
class A { foo(): number { return 1; } }
class C implements A {
    foo() {
        return 1;
    }
}

class C2 extends A {}

// no errors
var c: C;
var c2: C2;
c = c2;
c2 = c;

//// [classImplementsClass3.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () { return 1; };
    return A;
}());
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        return 1;
    };
    return C;
}());
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
}(A));
// no errors
var c;
var c2;
c = c2;
c2 = c;
