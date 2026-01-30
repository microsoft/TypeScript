//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames26_ES5.ts] ////

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
    var _a;
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype[(_a = {}, _a[_super.bar.call(this)] = 1, _a)[0]] = function () { };
    return C;
}(Base));
