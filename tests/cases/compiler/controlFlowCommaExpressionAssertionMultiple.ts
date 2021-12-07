function Narrow<T>(value: any): asserts value is T {}

function func(foo: any, bar: any) {
    Narrow<number>(foo), Narrow<string>(bar);
    foo;
    bar;
}

function func2(foo: any, bar: any, baz: any) {
    Narrow<number>(foo), Narrow<string>(bar), Narrow<boolean>(baz);
    foo;
    bar;
    baz;
}
