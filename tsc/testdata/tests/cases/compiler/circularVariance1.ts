// @noEmit: true

// https://github.com/microsoft/typescript-go/pull/4820

type Bar<U> = (x: Baz<U[]>) => void;

type Baz<V> = {
    value: Foo<V[]>;
}

type Foo<T> = {
    x: T;
    f: Bar<T>;
}

declare let foo1: Foo<unknown>;
declare let foo2: Foo<string>;

foo1 = foo2;
foo2 = foo1;  // Error

declare let bar1: Bar<unknown>;
declare let bar2: Bar<string>;

bar1 = bar2;  // Error
bar2 = bar1;
