//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticAndNonStaticPropertiesSameName.ts] ////

//// [staticAndNonStaticPropertiesSameName.ts]
class C {
    x: number;
    static x: number;

    f() { }
    static f() { }
}

//// [staticAndNonStaticPropertiesSameName.js]
class C {
    x;
    static x;
    f() { }
    static f() { }
}
