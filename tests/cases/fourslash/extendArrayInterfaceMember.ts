/// <reference path="fourslash.ts"/>

////var x = [1, 2, 3];
////var /*y*/y = /*1*/x.pop(5)/*2*/;
////

verify.errorExistsBetweenMarkers("1", "2");
verify.numberOfErrorsInCurrentFile(1);
// Expected errors exact:
// - Supplied parameters do not match any signature of call target.
// - Could not select overload for 'call' expression.

verify.quickInfoAt("y", "var y: number");

goTo.eof();
edit.insert("interface Array<T> { pop(def: T): T; }");

verify.not.errorExistsBetweenMarkers("1", "2");
verify.quickInfoAt("y", "var y: number");
verify.noErrors();
