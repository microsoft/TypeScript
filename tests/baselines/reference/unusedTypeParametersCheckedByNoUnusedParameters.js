//// [tests/cases/compiler/unusedTypeParametersCheckedByNoUnusedParameters.ts] ////

//// [unusedTypeParametersCheckedByNoUnusedParameters.ts]
function f<T>() { }

type T<T> = { };

interface I<T> { };

class C<T> {
    public m<V>() { }
};

let l = <T>() => { };


//// [unusedTypeParametersCheckedByNoUnusedParameters.js]
function f() { }
;
class C {
    m() { }
}
;
let l = () => { };
