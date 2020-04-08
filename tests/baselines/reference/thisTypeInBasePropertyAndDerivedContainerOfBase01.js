//// [thisTypeInBasePropertyAndDerivedContainerOfBase01.ts]
interface BoxOfFoo<T extends Foo> {
    item: T
}

interface Foo {
    self: this;
}

interface Bar extends Foo {
    other: BoxOfFoo<this>;
}

//// [thisTypeInBasePropertyAndDerivedContainerOfBase01.js]


//// [thisTypeInBasePropertyAndDerivedContainerOfBase01.d.ts]
interface BoxOfFoo<T extends Foo> {
    item: T;
}
interface Foo {
    self: this;
}
interface Bar extends Foo {
    other: BoxOfFoo<this>;
}
