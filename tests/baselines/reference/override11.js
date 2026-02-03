//// [tests/cases/conformance/override/override11.ts] ////

//// [override11.ts]
class Base {
    foo = 1;
}

class Sub extends Base {
    constructor (override public foo: number) {
        super();
    }
}


//// [override11.js]
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
        this.foo = 1;
    }
    return Base;
}());
var Sub = /** @class */ (function (_super) {
    __extends(Sub, _super);
    function Sub(foo) {
        var _this = _super.call(this) || this;
        _this.foo = foo;
        return _this;
    }
    return Sub;
}(Base));
