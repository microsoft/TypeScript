//// [tests/cases/compiler/staticsNotInScopeInClodule.ts] ////

//// [staticsNotInScopeInClodule.ts]
class Clod {
    static x = 10;
}

namespace Clod {
    var p = x; // x isn't in scope here
}

//// [staticsNotInScopeInClodule.js]
var Clod = /** @class */ (function () {
    function Clod() {
    }
    Clod.x = 10;
    return Clod;
}());
(function (Clod) {
    var p = x; // x isn't in scope here
})(Clod || (Clod = {}));
