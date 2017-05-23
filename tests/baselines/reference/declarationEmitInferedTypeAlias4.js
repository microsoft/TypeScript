//// [declarationEmitInferedTypeAlias4.ts]
function f<A>() {
    type Foo<T> = T | { x: Foo<T> };
    var x: Foo<A[]>;
    return x;
}

//// [declarationEmitInferedTypeAlias4.js]
function f() {
    var x;
    return x;
}


//// [declarationEmitInferedTypeAlias4.d.ts]
declare function f<A>(): A[] | {
    x: A[] | any;
};
