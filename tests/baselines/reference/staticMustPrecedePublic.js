//// [tests/cases/compiler/staticMustPrecedePublic.ts] ////

//// [staticMustPrecedePublic.ts]
class Outer {
    static public intI: number;
    static private stringF: string;
}


//// [staticMustPrecedePublic.js]
"use strict";
var Outer = /** @class */ (function () {
    function Outer() {
    }
    return Outer;
}());
