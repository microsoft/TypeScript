// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: index.js

// Pretty much all of this should be an error, (since index signatures and generics are forbidden in js),
// but we should be able to synthesize declarations from the symbols regardless

export class M<T> {
    field: T;
}

export class N<U> extends M<U> {
    other: U;
}

export class O {
    [idx: string]: string;
}

export class P extends O {}

export class Q extends O {
    [idx: string]: "ok";
}

export class R extends O {
    [idx: number]: "ok";
}

export class S extends O {
    [idx: string]: "ok";
    [idx: number]: never;
}

export class T {
    [idx: number]: string;
}

export class U extends T {}


export class V extends T {
    [idx: string]: string;
}

export class W extends T {
    [idx: number]: "ok";
}

export class X extends T {
    [idx: string]: string;
    [idx: number]: "ok";
}

export class Y {
    [idx: string]: {x: number};
    [idx: number]: {x: number, y: number};
}

export class Z extends Y {}

export class AA extends Y {
    [idx: string]: {x: number, y: number};
}

export class BB extends Y {
    [idx: number]: {x: 0, y: 0};
}

export class CC extends Y {
    [idx: string]: {x: number, y: number};
    [idx: number]: {x: 0, y: 0};
}
