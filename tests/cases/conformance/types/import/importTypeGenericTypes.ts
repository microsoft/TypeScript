// @declaration: true
// @lib: es6
// @filename: foo.ts
interface Point<T> {
    x: number;
    y: number;
    data: T;
}
export = Point;

// @filename: foo2.ts
namespace Bar {
    export interface I<T> {
        a: string;
        b: number;
        data: T;
    }
}

export namespace Baz {
    export interface J<T> {
        a: number;
        b: string;
        data: T;
    }
}

class Bar<T> {
    item: Bar.I<T>;
    constructor(input: Baz.J<T>) {}
}
export { Bar }

// @filename: usage.ts
export const x: import("./foo")<{x: number}> = { x: 0, y: 0, data: {x: 12} };
export let y: import("./foo2").Bar.I<{x: number}> = { a: "", b: 0, data: {x: 12} };

export class Bar2<T> {
    item: {a: string, b: number, c: object, data: T};
    constructor(input?: any) {}
}

export let shim: typeof import("./foo2") = {
    Bar: Bar2
};
