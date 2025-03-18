//// [tests/cases/compiler/blockScopedSameNameFunctionDeclarationES6.ts] ////

//// [blockScopedSameNameFunctionDeclarationES6.ts]
function foo(a: number) {
    if (a === 10) {
        function foo() { } // duplicate
        foo();
        foo(10); // not ok
    }
    else {
        function foo() { } // duplicate
        foo();
        foo(10);// not ok
    }
    foo(10); // not ok
    foo(); 
}
foo(10);
foo(); // not ok - needs number

//// [blockScopedSameNameFunctionDeclarationES6.js]
function foo(a) {
    if (a === 10) {
        function foo() { }
        foo();
        foo(10);
    }
    else {
        function foo() { }
        foo();
        foo(10);
    }
    foo(10);
    foo();
}
foo(10);
foo();
