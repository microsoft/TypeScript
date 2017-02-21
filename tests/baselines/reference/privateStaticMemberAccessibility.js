//// [privateStaticMemberAccessibility.ts]
class Base {
    private static foo: string;
}

class Derived extends Base {
    static bar = Base.foo; // error
    bing = () => Base.foo; // error
}

//// [privateStaticMemberAccessibility.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bing = function () { return Base.foo; }; // error
        return _this;
    }
    return Derived;
}(Base));
Derived.bar = Base.foo; // error
