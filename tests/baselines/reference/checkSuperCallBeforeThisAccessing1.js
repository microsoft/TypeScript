//// [checkSuperCallBeforeThisAccessing1.ts]
class Based { }
class Derived extends Based {
    public x: number;
    constructor() {
        super();
        this;
        this.x = 10;
        var that = this;
    }
}

//// [checkSuperCallBeforeThisAccessing1.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Based = (function () {
    function Based() {
    }
    return Based;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super.call(this) || this;
        _this;
        _this.x = 10;
        var that = _this;
        return _this;
    }
    return Derived;
}(Based));
