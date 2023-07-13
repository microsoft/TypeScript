//// [tests/cases/compiler/initializersInAmbientEnums.ts] ////

//// [initializersInAmbientEnums.ts]
declare enum E {
    a = 10,
    b = a,
    e = 10 << 2 * 8,
}

//// [initializersInAmbientEnums.js]
