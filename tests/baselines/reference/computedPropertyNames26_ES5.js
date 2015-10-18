//// [computedPropertyNames26_ES5.ts]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    [
        { [super.bar()]: 1 }[0]
    ]() { }
}

//// [computedPropertyNames26_ES5.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    Base.prototype.bar = function () {
        return 0;
    };
    return Base;
})();
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    C.prototype[(_a = {}, _a[_super.bar.call(this)] = 1, _a)[0]] = function () { };
    return C;
    var _a;
})(Base);
