//// [tests/cases/compiler/unusedTypeParametersNotCheckedByNoUnusedLocals.ts] ////

//// [unusedTypeParametersNotCheckedByNoUnusedLocals.ts]
function f<T>() { }

type T<T> = { };

interface I<T> { };

class C<T> {
    public m<V>() { }
};

let l = <T>() => { };


//// [unusedTypeParametersNotCheckedByNoUnusedLocals.js]
"use strict";
function f() { }
;
class C {
    m() { }
}
;
let l = () => { };
