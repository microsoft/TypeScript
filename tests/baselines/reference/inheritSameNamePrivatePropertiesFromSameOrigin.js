//// [inheritSameNamePrivatePropertiesFromSameOrigin.ts]
class B {
    private x: number;
}
class C extends B { }

class C2 extends B { }

interface A extends C, C2 { // ok
    y: string;
}

//// [inheritSameNamePrivatePropertiesFromSameOrigin.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var B = (function () {
    function B() {
    }
    return B;
})();
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(B);
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
})(B);
