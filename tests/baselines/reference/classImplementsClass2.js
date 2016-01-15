//// [classImplementsClass2.ts]
class A { foo(): number { return 1; } }
class C implements A {} // error

class C2 extends A {
    foo() {
        return 1;
    }
}

var c: C;
var c2: C2;
c = c2;
c2 = c;

//// [classImplementsClass2.js]
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
    return C;
}()); // error
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    C2.prototype.foo = function () {
        return 1;
    };
    return C2;
}(A));
var c;
var c2;
c = c2;
c2 = c;
