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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return P;
}(SomeBase));
P.SomeNumber = P.GetNumber();
