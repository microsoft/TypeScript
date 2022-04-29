/// <reference path="fourslash.ts"/>

////var n = '';/**/
////interface x extends /*1*/string/*2*/ {}

verify.not.errorExistsBeforeMarker();
verify.errorExistsBetweenMarkers("1", "2");
verify.numberOfErrorsInCurrentFile(1);
