//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendsItself.ts] ////

//// [classExtendsItself.ts]
class C extends C { } // error

class D<T> extends D<T> { } // error

class E<T> extends E<string> { } // error

//// [classExtendsItself.js]
class C extends C {
}
class D extends D {
}
class E extends E {
}
