/// <reference path="fourslash.ts"/>

////var x = [1, 2, 3];
////var y/*y*/ = x./*1*/pop/*2*/(5);
////

verify.errorExistsBetweenMarkers("1", "2");
verify.numberOfErrorsInCurrentFile(2);
// Expected errors are:
// - Supplied parameters do not match any signature of call target.
// - Could not select overload for 'call' expression.

goTo.marker("y");
verify.quickInfoIs("any");

goTo.eof();
edit.insert("interface Array<T> { pop(def: T): T; }");

verify.not.errorExistsBetweenMarkers("1", "2");
goTo.marker("y");
verify.quickInfoIs("number");
verify.numberOfErrorsInCurrentFile(0);
