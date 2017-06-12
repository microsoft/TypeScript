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
    var proto_1 = T.prototype;
    proto_1.y = function () { };
    return T;
}());
