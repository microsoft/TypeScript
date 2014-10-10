/// <reference path="fourslash.ts" />

//// declare class foo { };
//// function foo() { /**/ }

goTo.marker();

// One error: duplicate identifier 'foo'
verify.numberOfErrorsInCurrentFile(2);

// Shouldn't change the number of errors
edit.insert('return null;');
verify.numberOfErrorsInCurrentFile(2);

