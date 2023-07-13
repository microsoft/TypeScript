//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock5.ts] ////

//// [classStaticBlock5.ts]
class B {
    static a = 1;
    static b = 2;
}

class C extends B {
    static b = 3;
    static c = super.a

    static {
        this.b;
        super.b;
        super.a;
    }
}


//// [classStaticBlock5.js]
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
    function B() {
    }
    B.a = 1;
    B.b = 2;
    return B;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C.b = 3;
    C.c = _super.a;
    (function () {
        _a.b;
        _super.b;
        _super.a;
    })();
    return C;
}(B));
