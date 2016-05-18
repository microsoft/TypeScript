//// [blockScopedSameNameFunctionDeclarationStrictES6.ts]
"use strict";
function foo(a: number) {
    if (a === 10) {
        function foo() { }
        foo();
        foo(10); // not ok
    }
    else {
        function foo() { } 
        foo();
        foo(10); // not ok
    }
    foo(10);
    foo(); // not ok
}
foo(10);
foo(); // not ok - needs number

//// [blockScopedSameNameFunctionDeclarationStrictES6.js]
"use strict";
function foo(a) {
    if (a === 10) {
        function foo() { }
        foo();
        foo(10); // not ok
    }
    else {
        function foo() { }
        foo();
        foo(10); // not ok
    }
    foo(10);
    foo(); // not ok
}
foo(10);
foo(); // not ok - needs number
