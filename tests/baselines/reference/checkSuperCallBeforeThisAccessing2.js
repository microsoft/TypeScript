//// [checkSuperCallBeforeThisAccessing2.ts]
class Based { }
class Derived extends Based {
    public x: number;
    constructor() {
        this.x = 100;
        super();
        this.x = 10;
        var that = this;
    }
}

//// [checkSuperCallBeforeThisAccessing2.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
        this.x = 100;
        _super.call(this);
        this.x = 10;
        var that = this;
    }
    return Derived;
}(Based));
