//// [classSideInheritance1.ts]
class A {
  static bar(): string {
     return "";
    }
    foo(): number { return 1; }
}
 
class C2 extends A {}

var a: A;
var c: C2;
a.bar(); // static off an instance - should be an error
c.bar(); // static off an instance - should be an error
A.bar(); // valid
C2.bar(); // valid

//// [classSideInheritance1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A() {
    }
    A.bar = function () {
        return "";
    };
    A.prototype.foo = function () { return 1; };
    return A;
}());
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(A));
var a;
var c;
a.bar(); // static off an instance - should be an error
c.bar(); // static off an instance - should be an error
A.bar(); // valid
C2.bar(); // valid
