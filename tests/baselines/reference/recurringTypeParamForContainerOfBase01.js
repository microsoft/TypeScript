//// [tests/cases/conformance/types/typeParameters/recurringTypeParamForContainerOfBase01.ts] ////

//// [recurringTypeParamForContainerOfBase01.ts]
interface BoxOfFoo<T extends Foo<T>> {
    item: T
}

interface Foo<T extends Foo<T>> {
    self: T;
}

interface Bar<T extends Bar<T>> extends Foo<T> {
    other: BoxOfFoo<T>;
}

//// [recurringTypeParamForContainerOfBase01.js]


//// [recurringTypeParamForContainerOfBase01.d.ts]
interface BoxOfFoo<T extends Foo<T>> {
    item: T;
}
interface Foo<T extends Foo<T>> {
    self: T;
}
interface Bar<T extends Bar<T>> extends Foo<T> {
    other: BoxOfFoo<T>;
}
