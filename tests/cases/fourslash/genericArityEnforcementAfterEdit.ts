/// <reference path="fourslash.ts" />
// @noImplicitAny: true
//// interface G<T, U> { }
//// /**/
//// var v4: G<G<any>, any>;

verify.numberOfErrorsInCurrentFile(1);
goTo.marker();
edit.insert(' ');
verify.numberOfErrorsInCurrentFile(1);
