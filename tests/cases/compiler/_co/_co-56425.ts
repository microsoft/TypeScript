interface Foo {
    defoo(): never;
}

interface Bar {
    defoo(): void;
}

type Baz = Foo | Bar;

function defooer(baz: Baz) {
    baz.defoo()
    // type = void
    // aka (never | void)

    return baz
    // type = Baz
    // should narrow to Bar
}