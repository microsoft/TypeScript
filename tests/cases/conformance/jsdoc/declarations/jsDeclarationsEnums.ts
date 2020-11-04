// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: index.js

// Pretty much all of this should be an error, (since enums are forbidden in js),
// but we should be able to synthesize declarations from the symbols regardless

export enum A {}

export enum B {
    Member
}

enum C {}

export { C };

enum DD {}

export { DD as D };

export enum E {}
export { E as EE };

export { F as FF };
export enum F {}

export enum G {
    A = 1,
    B,
    C
}

export enum H {
    A = "a",
    B = "b"
}

export enum I {
    A = "a",
    B = 0,
    C
}

export const enum J {
    A = 1,
    B,
    C
}

export enum K {
    None   = 0,
    A = 1 << 0,
    B = 1 << 1,
    C = 1 << 2,
    Mask = A | B | C,
}

export const enum L {
    None   = 0,
    A = 1 << 0,
    B = 1 << 1,
    C = 1 << 2,
    Mask = A | B | C,
}
