//// [tests/cases/compiler/unusedSemicolonInClass.ts] ////

//// [unusedSemicolonInClass.ts]
class Unused {
    ;
}


//// [unusedSemicolonInClass.js]
var Unused = /** @class */ (function () {
    function Unused() {
    }
    ;
    return Unused;
}());
