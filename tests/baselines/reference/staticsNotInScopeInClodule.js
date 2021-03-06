//// [staticsNotInScopeInClodule.ts]
class Clod {
    static x = 10;
}

module Clod {
    var p = x; // x isn't in scope here
}

//// [staticsNotInScopeInClodule.js]
var Clod = /** @class */ (function () {
    function Clod() {
    }
    (function () {
        Clod.x = 10;
    }).call(Clod);
    return Clod;
}());
(function (Clod) {
    var p = x; // x isn't in scope here
})(Clod || (Clod = {}));
