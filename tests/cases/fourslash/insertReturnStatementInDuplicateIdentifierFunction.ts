/// <reference path="fourslash.ts" />

//// declare class foo { };
//// function foo() { /**/ }

goTo.marker();

// One error: duplicate identifier 'foo'
verify.numberOfErrorsInCurrentFile(1);

// Shouldn't change the number of errors
edit.insert('return null;');
verify.numberOfErrorsInCurrentFile(1);

