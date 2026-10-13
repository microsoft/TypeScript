//// [tests/cases/compiler/declarationEmitEnumNaN.ts] ////

//// [declarationEmitEnumNaN.ts]
export declare enum E {
    A = -NaN,
    B = NaN,
    C = Infinity,
    D = -Infinity,
}




//// [declarationEmitEnumNaN.d.ts]
export declare enum E {
    A = NaN,
    B = NaN,
    C = 1e999,
    D = -1e999
}
