//// [computedPropertyNames30_ES5.ts]
class Base {
}
class C extends Base {
    constructor() {
        super();
        () => {
            var obj = {
                // Ideally, we would capture this. But the reference is
                // illegal, and not capturing this is consistent with
                //treatment of other similar violations.
                [(super(), "prop")]() { }
            };
        }
    }
}

//// [computedPropertyNames30_ES5.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        var _this = _super.call(this) || this;
        (function () {
            var _a;
            var obj = (_a = {},
                // Ideally, we would capture this. But the reference is
                // illegal, and not capturing this is consistent with
                //treatment of other similar violations.
                _a[(_this = _super.call(this) || this, "prop")] = function () { },
                _a);
        });
        return _this;
    }
    return C;
}(Base));
