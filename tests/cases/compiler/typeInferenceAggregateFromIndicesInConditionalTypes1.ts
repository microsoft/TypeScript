// @strict: true
// @noEmit: true

type Foo = {
    a: string;
    b: number;
    c: boolean;
}

type AC<T> = T extends { a: (infer R extends Record<string, any>)["_a"]; c: (infer R)["_c"] } ? R : never;

type Result1 = AC<Foo>;
