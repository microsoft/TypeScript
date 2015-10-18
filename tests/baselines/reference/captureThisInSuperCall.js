//// [captureThisInSuperCall.ts]
class A {
    constructor(p:any) {}
}

class B extends A {
    constructor() { super({ test: () => this.someMethod()}); } 
    someMethod() {}
}

//// [captureThisInSuperCall.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A(p) {
    }
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        var _this = this;
        _super.call(this, { test: function () { return _this.someMethod(); } });
    }
    B.prototype.someMethod = function () { };
    return B;
})(A);
