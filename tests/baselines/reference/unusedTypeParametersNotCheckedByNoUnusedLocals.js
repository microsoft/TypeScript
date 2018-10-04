//// [unusedTypeParametersNotCheckedByNoUnusedLocals.ts]
function f<T>() { }

type T<T> = { };

interface I<T> { };

class C<T> {
    public m<V>() { }
};

let l = <T>() => { };


//// [unusedTypeParametersNotCheckedByNoUnusedLocals.js]
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
