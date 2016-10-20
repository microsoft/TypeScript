// @target: ES5
"use strict";
if (true) {
    function foo() { } // Error to declare function in block scope
    foo(); // This call should be ok
}
foo(); // Error to find name foo