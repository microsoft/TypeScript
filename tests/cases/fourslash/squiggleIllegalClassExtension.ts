/// <reference path="fourslash.ts"/>

////class Foo extends /*1*/Bar/*2*/ { }

verify.errorExistsBetweenMarkers("1", "2");
verify.numberOfErrorsInCurrentFile(1);
