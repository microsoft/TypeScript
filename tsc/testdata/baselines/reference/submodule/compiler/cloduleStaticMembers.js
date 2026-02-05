//// [tests/cases/compiler/cloduleStaticMembers.ts] ////

//// [cloduleStaticMembers.ts]
class Clod {
    private static x = 10;
    public static y = 10;
}
namespace Clod {
    var p = Clod.x;
    var q = x;

    var s = Clod.y;
    var t = y; 
}


//// [cloduleStaticMembers.js]
"use strict";
class Clod {
    static x = 10;
    static y = 10;
}
(function (Clod) {
    var p = Clod.x;
    var q = x;
    var s = Clod.y;
    var t = y;
})(Clod || (Clod = {}));
