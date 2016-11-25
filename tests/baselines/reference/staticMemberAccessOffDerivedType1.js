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
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SomeBase = (function () {
    function SomeBase() {
    }
    SomeBase.GetNumber = function () {
        return 2;
    };
    return SomeBase;
}());
var P = (function (_super) {
    __extends(P, _super);
    function P() {
        return _super.apply(this, arguments) || this;
    }
    return P;
}(SomeBase));
P.SomeNumber = P.GetNumber();
