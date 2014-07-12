//// [inheritedConstructorWithRestParams2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IBaseBase = (function () {
    function IBaseBase(x) {
    }
    return IBaseBase;
})();

var BaseBase2 = (function () {
    function BaseBase2(x) {
    }
    return BaseBase2;
})();

var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        _super.apply(this, arguments);
    }
    return Base;
})(BaseBase);

var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
})(Base);

// Ok
new Derived("", "");
new Derived("", 3);
new Derived("", 3, 3);
new Derived("", 3, 3, 3);
new Derived("", 3, "");
new Derived("", "", 3);
new Derived("", "", 3, 3);

// Errors
new Derived(3);
new Derived("", 3, "", 3);
new Derived("", 3, "", "");
