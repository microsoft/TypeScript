//// [scopeCheckExtendedClassInsideStaticMethod1.ts]
class C { private v; public p; static s; }
class D extends C {
   static c() {
      v = 1;
      this.p = 1;
      s = 1;
   }
}

//// [scopeCheckExtendedClassInsideStaticMethod1.js]
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
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D.c = function () {
        v = 1;
        this.p = 1;
        s = 1;
    };
    return D;
}(C));
