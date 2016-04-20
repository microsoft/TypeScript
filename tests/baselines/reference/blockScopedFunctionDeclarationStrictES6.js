//// [blockScopedFunctionDeclarationStrictES6.ts]
"use strict";
if (true) {
    function foo() { } // Allowed to declare block scope function
    foo(); // This call should be ok
}
foo(); // Cannot find name since foo is block scoped

//// [blockScopedFunctionDeclarationStrictES6.js]
"use strict";
if (true) {
    function foo() { } // Allowed to declare block scope function
    foo(); // This call should be ok
}
foo(); // Cannot find name since foo is block scoped
