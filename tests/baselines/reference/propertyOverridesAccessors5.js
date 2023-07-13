//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyOverridesAccessors5.ts] ////

//// [propertyOverridesAccessors5.ts]
class A {
    get p() { return 'oh no' }
}
class B extends A {
    constructor(public p: string) {
        super()
    }
}


//// [propertyOverridesAccessors5.js]
class A {
    get p() { return 'oh no'; }
}
class B extends A {
    p;
    constructor(p) {
        super();
        this.p = p;
    }
}
