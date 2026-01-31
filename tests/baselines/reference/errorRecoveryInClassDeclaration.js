//// [tests/cases/compiler/errorRecoveryInClassDeclaration.ts] ////

//// [errorRecoveryInClassDeclaration.ts]
class C {
    public bar() {
        var v = foo(
            public blaz() {}
            );
    }
}

//// [errorRecoveryInClassDeclaration.js]
class C {
    bar() {
        var v = foo(public, blaz(), {});
    }
}
