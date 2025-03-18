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
