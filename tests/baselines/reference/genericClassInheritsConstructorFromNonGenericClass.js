//// [genericClassInheritsConstructorFromNonGenericClass.ts]
class A extends B<string> { }
class B<U> extends C { }
class C {
    constructor(p: string) { }
}

//// [genericClassInheritsConstructorFromNonGenericClass.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        _super.apply(this, arguments);
    }
    return A;
})(B);
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(C);
var C = (function () {
    function C(p) {
    }
    return C;
})();
