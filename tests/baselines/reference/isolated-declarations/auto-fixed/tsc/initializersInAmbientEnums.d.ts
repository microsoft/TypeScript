//// [tests/cases/compiler/initializersInAmbientEnums.ts] ////

//// [initializersInAmbientEnums.ts]
declare enum E {
    a = 10,
    b = a,
    e = 10 << 2 * 8,
}

/// [Declarations] ////



//// [initializersInAmbientEnums.d.ts]
declare enum E {
    a = 10,
    b = 10,
    e = 655360
}
