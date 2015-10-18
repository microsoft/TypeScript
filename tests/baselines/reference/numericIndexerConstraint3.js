//// [numericIndexerConstraint3.ts]
class A {
    foo: number;
}

class B extends A {
    bar: string;
}

class C {
    0: B;
    [x: number]: A;
}

//// [numericIndexerConstraint3.js]
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
var C = (function () {
    function C() {
    }
    return C;
})();
