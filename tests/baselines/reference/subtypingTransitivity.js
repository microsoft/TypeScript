//// [subtypingTransitivity.ts]
class B {
    x: Object;
}

class D extends B {
    public x: string;
}
class D2 extends B {
    public x: number;
}

var b: B;
var d: D;
var d2: D2;

d.x = '';
b = d;
b.x = 1; // assigned number to string


//// [subtypingTransitivity.js]
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
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(B);
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
    }
    return D2;
})(B);
var b;
var d;
var d2;
d.x = '';
b = d;
b.x = 1; // assigned number to string
