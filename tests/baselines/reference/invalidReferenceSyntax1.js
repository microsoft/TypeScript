//// [invalidReferenceSyntax1.ts]
/// <reference path="missingquote.ts />
class C {

}

//// [invalidReferenceSyntax1.js]
/// <reference path="missingquote.ts />
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
