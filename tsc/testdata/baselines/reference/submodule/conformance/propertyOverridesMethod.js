//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyOverridesMethod.ts] ////

//// [propertyOverridesMethod.ts]
class A {
    m() { }
}
class B extends A {
    m = () => 1
}


//// [propertyOverridesMethod.js]
class A {
    m() { }
}
class B extends A {
    m = () => 1;
}
