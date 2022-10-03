// @declaration: true
// @lib: es6
// @filename: foo.ts
interface Point {
    x: number;
    y: number;
}
export = Point;

// @filename: foo2.ts
namespace Bar {
    export interface I {
        a: string;
        b: number;
    }
}

export namespace Baz {
    export interface J {
        a: number;
        b: string;
    }
}

class Bar {
    item: Bar.I;
    constructor(input: Baz.J) {}
}
export { Bar }

// @filename: usage.ts
export const x: import("./fo") = { x: 0, y: 0 };
export let y: import("./fo2").Bar.I = { a: "", b: 0 };
export let z: import("./foo2").Bar.Q = { a: "", b: 0 };

export class Bar2 {
    item: {a: string, b: number, c: object};
    constructor(input?: any) {}
}

export let shim: typeof import("./fo2") = {
    Bar: Bar2
};
