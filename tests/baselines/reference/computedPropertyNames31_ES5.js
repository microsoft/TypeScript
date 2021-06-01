//// [computedPropertyNames31_ES5.ts]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    foo() {
        () => {
            var obj = {
                [super.bar()]() { } // needs capture
            };
        }
        return 0;
    }
}

//// [computedPropertyNames31_ES5.js]
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
    Base.prototype.bar = function () {
        return 0;
    };
    return Base;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.foo = function () {
        var _this = this;
        (function () {
            var _a;
            var obj = (_a = {},
                _a[_super.prototype.bar.call(_this)] = function () { } // needs capture
            ,
                _a);
        });
        return 0;
    };
    return C;
}(Base));
