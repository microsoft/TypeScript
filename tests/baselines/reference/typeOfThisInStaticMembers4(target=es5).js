//// [typeOfThisInStaticMembers4.ts]
class C {
    static a = 1;
    static b = this.a + 1;
}

class D extends C {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
}


//// [typeOfThisInStaticMembers4.js]
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
var C = /** @class */ (function () {
    function C() {
    }
    var _a;
    _a = C;
    Object.defineProperty(C, "a", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 1
    });
    Object.defineProperty(C, "b", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _a.a + 1
    });
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _b;
    _b = D;
    Object.defineProperty(D, "c", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 2
    });
    Object.defineProperty(D, "d", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _b.c + 1
    });
    Object.defineProperty(D, "e", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _super.a + _b.c + 1
    });
    return D;
}(C));
