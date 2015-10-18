//// [privateAccessInSubclass1.ts]
class Base {
  private options: any;
}

class D extends Base {
  myMethod() {
    this.options;
  }
}

//// [privateAccessInSubclass1.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    D.prototype.myMethod = function () {
        this.options;
    };
    return D;
})(Base);
