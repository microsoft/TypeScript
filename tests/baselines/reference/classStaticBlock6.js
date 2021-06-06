//// [classStaticBlock6.ts]
class B {
    static a = 1;
}

class C extends B {
    static {
        var await = 1;
        var arguments = 1;
        var eval = 1;


        await: if (true) {

        }

        arguments;
        await;
        super();
    }
}


//// [classStaticBlock6.js]
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
var _C__;
var B = /** @class */ (function () {
    function B() {
    }
    B.a = 1;
    return B;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_C__ = { value: (function () {
        var await = 1;
        var arguments = 1;
        var eval = 1;
        yield ;
        if (true) {
        }
        arguments;
        yield ;
        _this = _super.call(this) || this;
    })() };
