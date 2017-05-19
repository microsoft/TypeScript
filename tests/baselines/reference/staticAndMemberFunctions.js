//// [staticAndMemberFunctions.ts]
class T {
    static x() { }
    public y() { }
}

//// [staticAndMemberFunctions.js]
var T = (function () {
    function T() {
    }
    T.x = function () { };
    T.prototype.y = function () { };
    return T;
}());
