//// [unusedTypeParametersWithUnderscore.ts]
function f<_T, U>() { }

type T<_T, U> = { };

interface I<_T, U> { };

class C<_T, U> {
    public m<_V, W>() { }
};

let l = <_T, U>() => { };


//// [unusedTypeParametersWithUnderscore.js]
function f() { }
;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function () { };
    return C;
}());
;
var l = function () { };
