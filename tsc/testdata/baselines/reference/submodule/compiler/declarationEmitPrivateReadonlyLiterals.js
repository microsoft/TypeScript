//// [tests/cases/compiler/declarationEmitPrivateReadonlyLiterals.ts] ////

//// [declarationEmitPrivateReadonlyLiterals.ts]
class Foo {
    private static readonly A = "a";
    private readonly B = "b";
    private static readonly C = 42;
    private readonly D = 42;
}


//// [declarationEmitPrivateReadonlyLiterals.js]
class Foo {
    static A = "a";
    B = "b";
    static C = 42;
    D = 42;
}
