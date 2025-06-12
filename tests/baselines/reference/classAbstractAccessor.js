//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractAccessor.ts] ////

//// [classAbstractAccessor.ts]
abstract class A {
   abstract get a();
   abstract get aa() { return 1; } // error
   abstract set b(x: string);
   abstract set bb(x: string) {} // error
}


//// [classAbstractAccessor.js]
class A {
    get aa() { return 1; } // error
    set bb(x) { } // error
}
