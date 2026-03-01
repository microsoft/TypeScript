//// [tests/cases/compiler/blockScopedFunctionDeclarationInStrictModule.ts] ////

//// [blockScopedFunctionDeclarationInStrictModule.ts]
if (true) {
    function foo() { }
    foo(); // ok
}

export = foo; // not ok

//// [blockScopedFunctionDeclarationInStrictModule.js]
"use strict";
if (true) {
    function foo() { }
    foo(); // ok
}
module.exports = foo;
