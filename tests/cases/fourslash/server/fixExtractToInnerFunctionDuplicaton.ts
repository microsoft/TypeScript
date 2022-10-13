/// <reference path="../fourslash.ts" />

//// function foo(): void { /*x*/console.log('a');/*y*/ }

goTo.select("x","y");
verify.refactorAvailable("Extract Symbol", 'function_scope_0', "Extract to inner function in function 'foo'");
verify.refactorAvailable("Extract Symbol", 'function_scope_1', "Extract to function in global scope");

verify.not.refactorAvailable("Extract Symbol", 'constant_scope_0', "Extract to inner function in function 'foo'");

verify.refactorAvailable("Extract Symbol", 'constant_scope_0', "Extract to constant in enclosing scope");
verify.refactorAvailable("Extract Symbol", 'constant_scope_1', "Extract to constant in global scope");

verify.not.refactorAvailable("Extract Symbol", 'constant_scope_0', "Extract to constant in global scope");