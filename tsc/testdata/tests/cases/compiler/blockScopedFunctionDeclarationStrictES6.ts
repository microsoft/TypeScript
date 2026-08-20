// @target: ES6
"use strict";
if (true) {
    function foo() { } // Allowed to declare block scope function
    foo(); // This call should be ok
}
foo(); // Cannot find name since foo is block scoped