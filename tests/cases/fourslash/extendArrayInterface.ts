/// <reference path="fourslash.ts"/>

////var x = [1, 2, 3];
////x./*1*/concat([4]);
////x./*2*/foo/*3*/()./*6*/toExponential/*7*/(2);
////x./*4*/foo/*5*/()./*8*/charAt/*9*/(0);
////


verify.completions({ marker: "1", includes: "concat" });

// foo doesn't exist, so both references should be in error
verify.errorExistsBetweenMarkers("2", "3");
verify.errorExistsBetweenMarkers("4", "5");

// Extend interface to contain foo returning type T
goTo.eof();
edit.insertLine("interface Array<T> { foo(): T; }");

// References to foo should now not be in error
verify.not.errorExistsBetweenMarkers("2", "3");
verify.not.errorExistsBetweenMarkers("4", "5");

// Resulting type should be a number, so toExponential should be valid, charAt should not
verify.not.errorExistsBetweenMarkers("6", "7");
verify.errorExistsBetweenMarkers("8", "9");

// Should only be the one error in the file
verify.numberOfErrorsInCurrentFile(1);