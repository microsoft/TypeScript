/// <reference path="fourslash.ts"/>

////() => {
////    var foo = 0;
////    /*requestCompletion*/
////    foo./*memberCompletion*/toString;
////}/*editDeclaration*/

goTo.marker("requestCompletion");
verify.completionListContains("foo");

goTo.marker("memberCompletion");
verify.completionListContains("toExponential");

// Now change the decl by adding a semicolon
goTo.marker("editDeclaration");
edit.insert(";");

// foo should still be there
goTo.marker("requestCompletion");
verify.completionListContains("foo");

goTo.marker("memberCompletion");
verify.completionListContains("toExponential");
