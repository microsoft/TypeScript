//// [tests/cases/compiler/constraintsUsedInPrototypeProperty.ts] ////

//// [constraintsUsedInPrototypeProperty.ts]
class Foo<T extends number, U, V extends string> { }
Foo.prototype; // Foo<any, any, any>

//// [constraintsUsedInPrototypeProperty.js]
class Foo {
}
Foo.prototype;
