//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration9.ts] ////

//// [parserMemberAccessorDeclaration9.ts]
class C {
    static public get Foo() { }
}

//// [parserMemberAccessorDeclaration9.js]
class C {
    static get Foo() { }
}
