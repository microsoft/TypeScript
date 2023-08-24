//// [tests/cases/compiler/superHasMethodsFromMergedInterface.ts] ////

//// [superHasMethodsFromMergedInterface.ts]
class C { m1() { } }
interface C { m2(): void }
class Sub extends C {
    m3() {
        super.m2();
    }
}


//// [superHasMethodsFromMergedInterface.js]
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
    C.prototype.m1 = function () { };
    return C;
}());
var Sub = /** @class */ (function (_super) {
    __extends(Sub, _super);
    function Sub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sub.prototype.m3 = function () {
        _super.prototype.m2.call(this);
    };
    return Sub;
}(C));
