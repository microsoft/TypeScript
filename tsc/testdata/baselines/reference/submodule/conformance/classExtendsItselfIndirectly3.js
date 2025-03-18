//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendsItselfIndirectly3.ts] ////

//// [classExtendsItselfIndirectly_file1.ts]
class C extends E { foo: string; } // error

//// [classExtendsItselfIndirectly_file2.ts]
class D extends C { bar: string; }

//// [classExtendsItselfIndirectly_file3.ts]
class E extends D { baz: number; }

//// [classExtendsItselfIndirectly_file4.ts]
class C2<T> extends E2<T> { foo: T; } // error

//// [classExtendsItselfIndirectly_file5.ts]
class D2<T> extends C2<T> { bar: T; }

//// [classExtendsItselfIndirectly_file6.ts]
class E2<T> extends D2<T> { baz: T; }

//// [classExtendsItselfIndirectly_file1.js]
class C extends E {
    foo;
}
//// [classExtendsItselfIndirectly_file2.js]
class D extends C {
    bar;
}
//// [classExtendsItselfIndirectly_file3.js]
class E extends D {
    baz;
}
//// [classExtendsItselfIndirectly_file4.js]
class C2 extends E2 {
    foo;
}
//// [classExtendsItselfIndirectly_file5.js]
class D2 extends C2 {
    bar;
}
//// [classExtendsItselfIndirectly_file6.js]
class E2 extends D2 {
    baz;
}
