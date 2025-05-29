//// [tests/cases/compiler/declarationEmitNestedGenerics.ts] ////

//// [declarationEmitNestedGenerics.ts]
function f<T>(p: T) {
    let g: <T>(x: T) => typeof p = null as any;
    return g;
}

function g<T>(x: T) {
    let y: typeof x extends (infer T)[] ? T : typeof x = null as any;
    return y;
}

//// [declarationEmitNestedGenerics.js]
function f(p) {
    let g = null;
    return g;
}
function g(x) {
    let y = null;
    return y;
}


//// [declarationEmitNestedGenerics.d.ts]
declare function f<T>(p: T): <T>(x: T) => T_1;
declare function g<T>(x: T): T extends (infer T_1)[] ? T_1 : T;


//// [DtsFileErrors]


declarationEmitNestedGenerics.d.ts(1,43): error TS2304: Cannot find name 'T_1'.


==== declarationEmitNestedGenerics.d.ts (1 errors) ====
    declare function f<T>(p: T): <T>(x: T) => T_1;
                                              ~~~
!!! error TS2304: Cannot find name 'T_1'.
    declare function g<T>(x: T): T extends (infer T_1)[] ? T_1 : T;
    