//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticPropertyAndFunctionWithSameName.ts] ////

//// [staticPropertyAndFunctionWithSameName.ts]
class C {
    static f: number;
    f: number;
}

class D {
    static f: number;
    f() { }
}

//// [staticPropertyAndFunctionWithSameName.js]
class C {
}
class D {
    f() { }
}
