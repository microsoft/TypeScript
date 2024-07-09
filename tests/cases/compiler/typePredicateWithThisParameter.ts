// Repro from #15310

interface Foo {
    foo: string;
}
interface Bar {
    bar: string;
}

function isFoo1(object: {}): object is Foo {
    return 'foo' in object;
}

function isFoo2(this: void, object: {}): object is Foo {
    return 'foo' in object;
}

declare let test: Foo | Bar;

if (isFoo1(test)) {
    test.foo = 'hi';
}

if (isFoo2(test)) {
    test.foo = 'hi';
}
