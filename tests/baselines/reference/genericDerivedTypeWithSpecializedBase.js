//// [genericDerivedTypeWithSpecializedBase.ts]
class A<T> {
    x: T;
}

class B<U> extends A<string> {
    y: U;
}

var x: A<number>;
var y: B<number>;
x = y;  // error


//// [genericDerivedTypeWithSpecializedBase.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);
var x;
var y;
x = y; // error
