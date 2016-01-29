//// [checkSuperCallBeforeThisAccessing5.ts]
class Based { constructor(...arg) { } }
class Derived extends Based {
    public x: number;
    constructor() {
        super(this.x);
    }
}

//// [checkSuperCallBeforeThisAccessing5.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Based = (function () {
    function Based() {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i - 0] = arguments[_i];
        }
    }
    return Based;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.call(this, this.x);
    }
    return Derived;
}(Based));
