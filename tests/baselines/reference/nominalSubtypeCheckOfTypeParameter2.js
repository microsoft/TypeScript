//// [nominalSubtypeCheckOfTypeParameter2.ts]
interface B<T> {
    bar: T;
}

// ok
interface A<T> extends B<T> {
    foo: T;
}

// ok
interface A2<T> extends B<B<string>> {
    baz: T;
}

interface C<T> {
    bam: T;
}

// ok
interface A3<T> extends B<C<T>> {
    bing: T;
}

//// [nominalSubtypeCheckOfTypeParameter2.js]
