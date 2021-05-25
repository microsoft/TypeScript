//// [declarationEmitFunctionDuplicateNamespace.ts]
function f(a: 0): 0;
function f(a: 1): 1;
function f(a: 0 | 1) {
    return a;
}

f.x = 2;


//// [declarationEmitFunctionDuplicateNamespace.js]
function f(a) {
    return a;
}
f.x = 2;


//// [declarationEmitFunctionDuplicateNamespace.d.ts]
declare function f(a: 0): 0;
declare function f(a: 1): 1;
declare namespace f {
    var x: number;
}
