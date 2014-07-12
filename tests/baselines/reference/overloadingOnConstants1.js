//// [overloadingOnConstants1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    Base.prototype.foo = function () {
    };
    return Base;
})();
var Derived1 = (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        _super.apply(this, arguments);
    }
    Derived1.prototype.bar = function () {
    };
    return Derived1;
})(Base);
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    Derived2.prototype.baz = function () {
    };
    return Derived2;
})(Base);
var Derived3 = (function (_super) {
    __extends(Derived3, _super);
    function Derived3() {
        _super.apply(this, arguments);
    }
    Derived3.prototype.biz = function () {
    };
    return Derived3;
})(Base);

var d2;

// these are ok
var htmlElement = d2.createElement("yo");
var htmlCanvasElement = d2.createElement("canvas");
var htmlDivElement = d2.createElement("div");
var htmlSpanElement = d2.createElement("span");

// these are errors
var htmlElement2 = d2.createElement("yo");
var htmlCanvasElement2 = d2.createElement("canvas");
var htmlDivElement2 = d2.createElement("div");
var htmlSpanElement2 = d2.createElement("span");
