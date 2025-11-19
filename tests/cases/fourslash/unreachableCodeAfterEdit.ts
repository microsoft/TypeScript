/// <reference path="fourslash.ts" />

// @allowUnreachableCode: false

//// /*before*/const x = 1;
//// const y = 2;
//// const z = 3;
//// /*after*/

// Initially, there should be no errors
verify.numberOfErrorsInCurrentFile(0);

// Add a throw statement at the beginning
goTo.marker("before");
edit.insert("throw new Error('foo');\n");

// Now there should be unreachable code errors (the const declarations)
verify.numberOfErrorsInCurrentFile(1);

// Remove the throw statement
goTo.marker("before");
edit.deleteAtCaret("throw new Error('foo');\n".length);

// After removing the throw, there should be no errors again
// BUG: This will fail because reportedUnreachableNodes is not cleared properly
verify.numberOfErrorsInCurrentFile(0);
