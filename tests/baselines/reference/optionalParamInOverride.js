//// [optionalParamInOverride.ts]
class Z {
    public func(): void { }
}
class Y extends Z {
    public func(value?: any): void { }
}


//// [optionalParamInOverride.js]
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
var Z = /** @class */ (function () {
    function Z() {
    }
    Z.prototype.func = function () { };
    return Z;
}());
var Y = /** @class */ (function (_super) {
    __extends(Y, _super);
    function Y() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Y.prototype.func = function (value) { };
    return Y;
}(Z));
