//// [tests/cases/compiler/genericClassInheritsConstructorFromNonGenericClass.ts] ////

//// [genericClassInheritsConstructorFromNonGenericClass.ts]
class A extends B<string> { }
class B<U> extends C { }
class C {
    constructor(p: string) { }
}

//// [genericClassInheritsConstructorFromNonGenericClass.js]
class A extends B {
}
class B extends C {
}
class C {
    constructor(p) { }
}
