//// [tests/cases/compiler/staticAndMemberFunctions.ts] ////

//// [staticAndMemberFunctions.ts]
class T {
    static x() { }
    public y() { }
}

//// [staticAndMemberFunctions.js]
var T = /** @class */ (function () {
    function T() {
    }
    T.x = function () { };
    T.prototype.y = function () { };
    return T;
}());
