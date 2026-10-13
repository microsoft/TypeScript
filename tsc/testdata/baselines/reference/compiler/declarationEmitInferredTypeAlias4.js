//// [tests/cases/compiler/declarationEmitInferredTypeAlias4.ts] ////

//// [declarationEmitInferredTypeAlias4.ts]
function f<A>() {
    type Foo<T> = T | { x: Foo<T> };
    var x: Foo<A[]>;
    return x;
}

//// [declarationEmitInferredTypeAlias4.js]
"use strict";
function f() {
    var x;
    return x;
}


//// [declarationEmitInferredTypeAlias4.d.ts]
type f_recursive<A> = {
    x: A[] | f_recursive<A>;
};
declare function f<A>(): A[] | f_recursive<A>;
