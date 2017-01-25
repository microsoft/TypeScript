//// [superInCatchBlock1.ts]
class A {
 m(): void { }
}
class B extends A {
 m() {
  try {
  }
  catch (e) {
   super.m();
  }
 }
}


//// [superInCatchBlock1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = (function () {
    function A() {
    }
    A.prototype.m = function () { };
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.m = function () {
        try {
        }
        catch (e) {
            _super.prototype.m.call(this);
        }
    };
    return B;
}(A));
