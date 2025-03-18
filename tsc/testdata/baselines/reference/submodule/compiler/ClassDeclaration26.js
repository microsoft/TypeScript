//// [tests/cases/compiler/ClassDeclaration26.ts] ////

//// [ClassDeclaration26.ts]
class C {
    public const var export foo = 10;

    var constructor() { }
}

//// [ClassDeclaration26.js]
class C {
    var;
    export foo = 10;
}
var constructor;
() => { };
