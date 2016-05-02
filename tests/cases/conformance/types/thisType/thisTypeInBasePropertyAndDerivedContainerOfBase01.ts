// @declaration: true

interface BoxOfFoo<T extends Foo> {
    item: T
}

interface Foo {
    self: this;
}

interface Bar extends Foo {
    other: BoxOfFoo<this>;
}