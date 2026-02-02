//// [tests/cases/compiler/classDeclarationBlockScoping2.ts] ////

//// [classDeclarationBlockScoping2.ts]
function f() {
    class C {}
    var c1 = C;
    {
        class C {}
        var c2 = C;
    }
    return C === c1;
}

//// [classDeclarationBlockScoping2.js]
function f() {
    class C {
    }
    var c1 = C;
    {
        class C {
        }
        var c2 = C;
    }
    return C === c1;
}
