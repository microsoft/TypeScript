//// [blockScopedFunctionDeclarationInStrictModule.ts]
if (true) {
    function foo() { }
    foo(); // ok
}

export = foo; // not ok

//// [blockScopedFunctionDeclarationInStrictModule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    if (true) {
        function foo() { }
        foo(); // ok
    }
    return foo;
});
