//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/superPropertyInConstructorBeforeSuperCall.ts] ////

//// [superPropertyInConstructorBeforeSuperCall.ts]
class B {
    constructor(x?: string) {}
    x(): string { return ""; }
}
class C1 extends B {
    constructor() {
        super.x();
        super();
    }
}
class C2 extends B {
    constructor() {
        super(super.x());
    }
}

//// [superPropertyInConstructorBeforeSuperCall.js]
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
var B = /** @class */ (function () {
    function B(x) {
    }
    B.prototype.x = function () { return ""; };
    return B;
}());
var C1 = /** @class */ (function (_super) {
    __extends(C1, _super);
    function C1() {
        var _this = this;
        _super.prototype.x.call(_this);
        _this = _super.call(this) || this;
        return _this;
    }
    return C1;
}(B));
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        var _this = _super.call(this, _super.prototype.x.call(_this)) || this;
        return _this;
    }
    return C2;
}(B));
