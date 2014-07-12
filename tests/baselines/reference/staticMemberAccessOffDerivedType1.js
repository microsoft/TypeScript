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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SomeBase = (function () {
    function SomeBase() {
    }
    SomeBase.GetNumber = function () {
        return 2;
    };
    return SomeBase;
})();
var P = (function (_super) {
    __extends(P, _super);
    function P() {
        _super.apply(this, arguments);
    }
    P.SomeNumber = P.GetNumber();
    return P;
})(SomeBase);
