// @declaration: true

interface Foo {
    a: string;
    b: number;
    c: boolean;
}

export type Bar = Omit<Foo, "c">;
export type Baz = Omit<Foo, "b" | "c">;

export function getBarA(bar: Bar) {
    return bar.a;
}

export function getBazA(baz: Baz) {
    return baz.a;
}

