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
    constructor() {
        this.B = "b";
        this.D = 42;
    }
}
Foo.A = "a";
Foo.C = 42;


//// [declarationEmitPrivateReadonlyLiterals.d.ts]
declare class Foo {
    private static readonly A;
    private readonly B;
    private static readonly C;
    private readonly D;
}
