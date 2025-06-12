//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendsItselfIndirectly.ts] ////

//// [classExtendsItselfIndirectly.ts]
class C extends E { foo: string; } // error

class D extends C { bar: string; }

class E extends D { baz: number; }

class C2<T> extends E2<T> { foo: T; } // error

class D2<T> extends C2<T> { bar: T; }

class E2<T> extends D2<T> { baz: T; }

//// [classExtendsItselfIndirectly.js]
class C extends E {
} // error
class D extends C {
}
class E extends D {
}
class C2 extends E2 {
} // error
class D2 extends C2 {
}
class E2 extends D2 {
}
