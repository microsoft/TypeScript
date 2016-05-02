// @declaration: true

interface BoxOfFoo<T extends Foo<T>> {
    item: T
}

interface Foo<T extends Foo<T>> {
    self: T;
}

interface Bar<T extends Bar<T>> extends Foo<T> {
    other: BoxOfFoo<T>;
}