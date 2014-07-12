//// [derivedClassOverridesPrivateFunction1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseClass = (function () {
    function BaseClass() {
        this._init();
    }
    BaseClass.prototype._init = function () {
    };
    return BaseClass;
})();
var DerivedClass = (function (_super) {
    __extends(DerivedClass, _super);
    function DerivedClass() {
        _super.call(this);
    }
    DerivedClass.prototype._init = function () {
    };
    return DerivedClass;
})(BaseClass);
new DerivedClass();
