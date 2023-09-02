export type Blah =
    | { type: "foo", abc: string }
    | { type: "bar", xyz: number, extra: any };

declare function thing(blah: Blah): void;

let foo1 = "foo";
thing({
    type: foo1,
    abc: "hello!"
});

let foo2 = "foo";
thing({
    type: foo2,
    abc: "hello!",
    extra: 123,
});

let bar = "bar";
thing({
    type: bar,
    xyz: 123,
    extra: 123,
});
