//// [staticMethodsReferencingClassTypeParameters.js]
var C = (function () {
    function C() {
    }
    C.s = function (p) {
        return p;
    };
    return C;
})();
