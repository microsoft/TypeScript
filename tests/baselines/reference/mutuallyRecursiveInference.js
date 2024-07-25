//// [tests/cases/compiler/mutuallyRecursiveInference.ts] ////

//// [mutuallyRecursiveInference.ts]
class T<A> {
    a: A;
    b: any
}
class L<RT extends { a: 'a' | 'b', b: any }> extends T<RT[RT['a']]> {
    m() { this.a }
}
class X extends L<X> {
    a: 'a' | 'b'
    b: number
    m2() {
        this.a
    }
}


//// [mutuallyRecursiveInference.js]
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
var T = /** @class */ (function () {
    function T() {
    }
    return T;
}());
var L = /** @class */ (function (_super) {
    __extends(L, _super);
    function L() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    L.prototype.m = function () { this.a; };
    return L;
}(T));
var X = /** @class */ (function (_super) {
    __extends(X, _super);
    function X() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    X.prototype.m2 = function () {
        this.a;
    };
    return X;
}(L));
