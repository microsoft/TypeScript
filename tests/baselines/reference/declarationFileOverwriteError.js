//// [tests/cases/compiler/declarationFileOverwriteError.ts] ////

//// [a.d.ts]
declare class c {
}

//// [a.ts]
class d {
}

//// [a.js]
var d = /** @class */ (function () {
    function d() {
    }
    return d;
}());
