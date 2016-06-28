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
    C.prototype.foo = function () {
        var _this = this;
        (function () {
            var obj = (_a = {},
                _a[_super.prototype.bar.call(_this)] = function () { },
                _a
            );
            var _a;
        });
        return 0;
    };
    return C;
}(Base));
