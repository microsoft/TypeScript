//// [tests/cases/compiler/staticPropSuper.ts] ////

//// [staticPropSuper.ts]
class A {
}

class B extends A {
    public static s: number = 9;

    constructor() {
        var x = 1; // should not error
        super();
    }
}

class C extends A {
    public p: number = 10;

    constructor() {
        var x = 1; // should error
    }
}

class D extends A {
    private p: number = 11;

    constructor() {
        var x = 1; // should error
    }
}

class E extends A {
    p: number = 12;

    constructor() {
        var x = 1; // should error
    }
}

//// [staticPropSuper.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        var x = 1; // should not error
        return _super.call(this) || this;
    }
    B.s = 9;
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        var _this = this;
        _this.p = 10;
        var x = 1; // should error
        return _this;
    }
    return C;
}(A));
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = this;
        _this.p = 11;
        var x = 1; // should error
        return _this;
    }
    return D;
}(A));
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        var _this = this;
        _this.p = 12;
        var x = 1; // should error
        return _this;
    }
    return E;
}(A));
