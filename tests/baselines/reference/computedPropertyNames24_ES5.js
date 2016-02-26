//// [computedPropertyNames24_ES5.ts]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    [super.bar()]() { }
}

//// [computedPropertyNames24_ES5.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
}());
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    C.prototype[_super.bar.call(this)] = function () { };
    return C;
}(Base));
