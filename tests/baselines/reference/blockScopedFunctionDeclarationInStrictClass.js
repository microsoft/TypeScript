//// [tests/cases/compiler/blockScopedFunctionDeclarationInStrictClass.ts] ////

//// [blockScopedFunctionDeclarationInStrictClass.ts]
class c {
    method() {
        if (true) {
            function foo() { }
            foo(); // ok
        }
        foo(); // not ok
    }
}

//// [blockScopedFunctionDeclarationInStrictClass.js]
class c {
    method() {
        if (true) {
            function foo() { }
            foo(); // ok
        }
        foo(); // not ok
    }
}
