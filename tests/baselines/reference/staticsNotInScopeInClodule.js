//// [tests/cases/compiler/staticsNotInScopeInClodule.ts] ////

//// [staticsNotInScopeInClodule.ts]
class Clod {
    static x = 10;
}

module Clod {
    var p = x; // x isn't in scope here
}

//// [staticsNotInScopeInClodule.js]
class Clod {
}
Clod.x = 10;
(function (Clod) {
    var p = x; // x isn't in scope here
})(Clod || (Clod = {}));
