//// [tests/cases/compiler/nonGenericClassExtendingGenericClassWithAny.ts] ////

//// [nonGenericClassExtendingGenericClassWithAny.ts]
class Foo<T> {
    t: T;
}

class Bar extends Foo<any> { } // Valid

//// [nonGenericClassExtendingGenericClassWithAny.js]
class Foo {
    t;
}
class Bar extends Foo {
} // Valid
