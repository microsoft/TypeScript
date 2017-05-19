//// [superPropertyAccess2.ts]
class C {
    public static foo() { }
    public get x() {
        return 1;
    }

    public static bar() { }
}

class D extends C {
    public static foo() {
        super.bar(); // OK
        super.x;  // error
    }

    constructor() {
        super();
        super.bar(); // error
        super.x;  // error
    }

    public static get y() {
        super.bar(); // OK
        super.x; // error
        return 1;
    }
}

//// [superPropertyAccess2.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C = (function () {
    function C() {
    }
    C.foo = function () { };
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    C.bar = function () { };
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super.call(this) || this;
        _super.prototype.bar.call(_this); // error
        _super.prototype.x; // error
        return _this;
    }
    D.foo = function () {
        _super.bar.call(this); // OK
        _super.x; // error
    };
    Object.defineProperty(D, "y", {
        get: function () {
            _super.bar.call(this); // OK
            _super.x; // error
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return D;
}(C));
