//// [tests/cases/conformance/classes/propertyMemberDeclarations/accessorsOverrideProperty5.ts] ////

//// [accessorsOverrideProperty5.ts]
interface I {
    p: number
}
interface B extends I { }
class B { }
class C extends B {
    get p() { return 1 }
    set p(value) { }
}


//// [accessorsOverrideProperty5.js]
class B {
}
class C extends B {
    get p() { return 1; }
    set p(value) { }
}
