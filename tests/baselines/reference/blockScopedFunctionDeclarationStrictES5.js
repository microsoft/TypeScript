//// [blockScopedFunctionDeclarationStrictES5.ts]
"use strict";
if (true) {
    function foo() { } // Error to declare function in block scope
    foo(); // This call should be ok
}
foo(); // Error to find name foo

//// [blockScopedFunctionDeclarationStrictES5.js]
"use strict";
if (true) {
    function foo() { } // Error to declare function in block scope
    foo(); // This call should be ok
}
foo(); // Error to find name foo
