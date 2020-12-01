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
    var g = null;
    return g;
}
function g(x) {
    var y = null;
    return y;
}


//// [declarationEmitNestedGenerics.d.ts]
declare function f<T>(p: T): <T_1>(x: T_1) => typeof p;
declare function g<T>(x: T): T extends (infer T_1)[] ? T_1 : T;
