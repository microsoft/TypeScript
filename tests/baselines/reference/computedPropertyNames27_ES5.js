//// [computedPropertyNames27_ES5.ts]
class Base {
}
class C extends Base {
    [(super(), "prop")]() { }
}

//// [computedPropertyNames27_ES5.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    C.prototype[(_super.call(this), "prop")] = function () { };
    return C;
}(Base));
