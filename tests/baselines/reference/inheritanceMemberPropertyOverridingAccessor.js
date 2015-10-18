//// [inheritanceMemberPropertyOverridingAccessor.ts]
class a {
    private __x: () => string;
    get x() {
        return this.__x;
    }
    set x(aValue: () => string) {
        this.__x = aValue;
    }
}

class b extends a {
    x: () => string;
}

//// [inheritanceMemberPropertyOverridingAccessor.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var a = (function () {
    function a() {
    }
    Object.defineProperty(a.prototype, "x", {
        get: function () {
            return this.__x;
        },
        set: function (aValue) {
            this.__x = aValue;
        },
        enumerable: true,
        configurable: true
    });
    return a;
})();
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
    }
    return b;
})(a);
