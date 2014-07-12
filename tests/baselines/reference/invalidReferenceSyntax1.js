//// [invalidReferenceSyntax1.js]
/// <reference path="missingquote.ts />
var C = (function () {
    function C() {
    }
    return C;
})();
