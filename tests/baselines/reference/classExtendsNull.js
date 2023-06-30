//// [tests/cases/compiler/classExtendsNull.ts] ////

//// [classExtendsNull.ts]
class C extends null {
    constructor() {
        super();
        return Object.create(null);
    }
}

class D extends null {
    constructor() {
        return Object.create(null);
    }
}

//// [classExtendsNull.js]
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
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        var _this = _super.call(this) || this;
        return Object.create(null);
    }
    return C;
}(null));
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return Object.create(null);
    }
    return D;
}(null));
