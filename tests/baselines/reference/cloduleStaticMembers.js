//// [cloduleStaticMembers.ts]
class Clod {
    private static x = 10;
    public static y = 10;
}
module Clod {
    var p = Clod.x;
    var q = x;

    var s = Clod.y;
    var t = y; 
}


//// [cloduleStaticMembers.js]
var Clod = /** @class */ (function () {
    function Clod() {
    }
    (function () {
        Clod.x = 10;
        Clod.y = 10;
    }).call(Clod);
    return Clod;
}());
(function (Clod) {
    var p = Clod.x;
    var q = x;
    var s = Clod.y;
    var t = y;
})(Clod || (Clod = {}));
