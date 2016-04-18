// @target: ES5
"use strict";
function foo(a: number) {
    if (a === 1) {
        function foo() { } // Error to declare function in block scope
        foo();
        foo(10); // not ok
    }
    else {
        function foo() { } // Error to declare function in block scope
        foo();
        foo(10); // not ok
    }
    foo(10);
    foo(); // not ok - needs number
}
foo(10);
foo(); // not ok - needs number