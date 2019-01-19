/// <reference path="fourslash.ts"/>

//// var /*1*/export/*2*/;
//// var foo;
//// var /*3*/class/*4*/;
//// var bar;


verify.errorExistsBetweenMarkers("1", "2");
verify.errorExistsBetweenMarkers("3", "4");
verify.numberOfErrorsInCurrentFile(3);
goTo.eof();
verify.completions({ includes: ["foo", "bar"] });
