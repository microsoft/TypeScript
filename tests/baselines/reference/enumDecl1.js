//// [tests/cases/compiler/enumDecl1.ts] ////

//// [enumDecl1.ts]
declare module mAmbient {
    enum e {
        x,
        y,
        z
    }
}


//// [enumDecl1.js]


//// [enumDecl1.d.ts]
declare namespace mAmbient {
    enum e {
        x,
        y,
        z
    }
}
