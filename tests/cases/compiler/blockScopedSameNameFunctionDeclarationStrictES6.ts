// @target: ES6
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