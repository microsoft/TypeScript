//// [superCallFromClassThatDerivesNonGenericTypeButWithTypeArguments1.ts]

class A {
    constructor(private map: (value: number) => string) {

    }
}

class B extends A<number, string> {
    constructor() { super(value => String(value)); }
}

//// [superCallFromClassThatDerivesNonGenericTypeButWithTypeArguments1.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A(map) {
        this.map = map;
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super.call(this, function (value) { return String(value); }) || this;
    }
    return B;
}(A));
