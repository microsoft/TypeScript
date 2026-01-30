//// [tests/cases/compiler/invalidReferenceSyntax1.ts] ////

//// [invalidReferenceSyntax1.ts]
/// <reference path="missingquote.ts />
class C {

}

//// [invalidReferenceSyntax1.js]
"use strict";
/// <reference path="missingquote.ts />
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
