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
declare module mAmbient {
    enum e {
        x = 0,
        y = 1,
        z = 2,
    }
}
