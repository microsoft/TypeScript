//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyOverridesAccessors6.ts] ////

//// [a.d.ts]
declare class A {
    /**@accessor*/ p: number
}
//// [b.ts]
class B extends A {
    get p() { return 1 }
    set p(value) { }
}


//// [b.js]
class B extends A {
    get p() { return 1; }
    set p(value) { }
}
