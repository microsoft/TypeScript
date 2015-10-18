//// [scopeTests.ts]
class C { private v; public p; static s; }
class D extends C {
  public v: number;
  public p: number
  constructor() {
   super()
   this.v = 1;
   this.p = 1;
   C.s = 1;
  }
}

//// [scopeTests.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
    }
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.call(this);
        this.v = 1;
        this.p = 1;
        C.s = 1;
    }
    return D;
})(C);
