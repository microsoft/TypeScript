//// [tests/cases/conformance/classes/classDeclarations/classExtendingNull.ts] ////

//// [classExtendingNull.ts]
class C1 extends null { }
class C2 extends (null) { }
class C3 extends null { x = 1; }
class C4 extends (null) { x = 1; }

//// [classExtendingNull.js]
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
var C1 = /** @class */ (function (_super) {
    __extends(C1, _super);
    function C1() {
    }
    return C1;
}(null));
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
    }
    return C2;
}((null)));
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3() {
        this.x = 1;
    }
    return C3;
}(null));
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4() {
        this.x = 1;
    }
    return C4;
}((null)));
