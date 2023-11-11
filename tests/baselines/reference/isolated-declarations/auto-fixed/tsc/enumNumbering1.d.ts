//// [tests/cases/compiler/enumNumbering1.ts] ////

//// [enumNumbering1.ts]
enum Test {
    A,
    B,
    C = Math.floor(Math.random() * 1000),
    D = 10,
    E // Error but shouldn't be
}


/// [Declarations] ////



//// [/.src/enumNumbering1.d.ts]
declare enum Test {
    A = 0,
    B = 1,
    C,
    D = 10,
    E = 11
}
