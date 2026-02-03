//// [tests/cases/compiler/useBeforeDeclaration_superClass.ts] ////

//// [useBeforeDeclaration_superClass.ts]
class C {
    x = 0;
}
class D extends C {
    // Not an error -- this will access the parent's initialized value for `x`, not the one on the child.
    old_x = this.x;
    x = 1;
}

// Test that it works on chains of classes
class X {
    x = 0;
}
class Y extends X {}
class Z extends Y {
    old_x = this.x;
    x = 1;
}

// Interface doesn't count
interface I {
    x: number;
}
class J implements I {
    old_x = this.x;
    x = 1;
}


//// [useBeforeDeclaration_superClass.js]
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
        this.x = 0;
    }
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Not an error -- this will access the parent's initialized value for `x`, not the one on the child.
        _this.old_x = _this.x;
        _this.x = 1;
        return _this;
    }
    return D;
}(C));
// Test that it works on chains of classes
var X = /** @class */ (function () {
    function X() {
        this.x = 0;
    }
    return X;
}());
var Y = /** @class */ (function (_super) {
    __extends(Y, _super);
    function Y() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Y;
}(X));
var Z = /** @class */ (function (_super) {
    __extends(Z, _super);
    function Z() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.old_x = _this.x;
        _this.x = 1;
        return _this;
    }
    return Z;
}(Y));
var J = /** @class */ (function () {
    function J() {
        this.old_x = this.x;
        this.x = 1;
    }
    return J;
}());
