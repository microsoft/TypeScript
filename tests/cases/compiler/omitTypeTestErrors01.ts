// @declaration: true

interface Foo {
    a: string;
    b: number;
    c: boolean;
}

export type Bar = Omit<Foo, "c">;
export type Baz = Omit<Foo, "b" | "c">;

export function getBarC(bar: Bar) {
    return bar.c;
}

export function getBazB(baz: Baz) {
    return baz.b;
}

