/// <reference path="fourslash.ts"/>

////function takesCallback(callback: (n) => any) { }
////takesCallback(function inner(n) { var /*1*/k/*2*/: string = 10; });

verify.errorExistsBetweenMarkers("1", "2");
verify.not.errorExistsBeforeMarker("1");
verify.not.errorExistsAfterMarker("2");
verify.numberOfErrorsInCurrentFile(1);
