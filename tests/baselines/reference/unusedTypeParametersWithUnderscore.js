//// [unusedTypeParametersWithUnderscore.ts]
function f<_T, U>() { }

type T<_T, U> = { };

interface I<_T, U> { };

class C<_T, U> { };


//// [unusedTypeParametersWithUnderscore.js]
function f() { }
;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
;
