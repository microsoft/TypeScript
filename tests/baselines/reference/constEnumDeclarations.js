//// [tests/cases/compiler/constEnumDeclarations.ts] ////

//// [constEnumDeclarations.ts]
const enum E {
    A = 1,
    B = 2,
    C = A | B
}

const enum E2 {
    A = 1,
    B,
    C
}

//// [constEnumDeclarations.js]


//// [constEnumDeclarations.d.ts]
declare const enum E {
    A = 1,
    B = 2,
    C = 3
}
declare const enum E2 {
    A = 1,
    B = 2,
    C = 3
}
