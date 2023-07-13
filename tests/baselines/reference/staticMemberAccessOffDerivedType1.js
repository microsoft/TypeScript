//// [tests/cases/compiler/staticMemberAccessOffDerivedType1.ts] ////

//// [staticMemberAccessOffDerivedType1.ts]
class SomeBase {
    static GetNumber() {
        return 2;
    }
}
class P extends SomeBase {
    static SomeNumber = P.GetNumber();
}


//// [staticMemberAccessOffDerivedType1.js]
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
var SomeBase = /** @class */ (function () {
    function SomeBase() {
    }
    SomeBase.GetNumber = function () {
        return 2;
    };
    return SomeBase;
}());
var P = /** @class */ (function (_super) {
    __extends(P, _super);
    function P() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    P.SomeNumber = P.GetNumber();
    return P;
}(SomeBase));
