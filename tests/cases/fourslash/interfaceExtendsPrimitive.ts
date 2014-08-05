/// <reference path="fourslash.ts"/>

// Ensure there is only one error here and that it is in the type ref of the base

//// interface x extends /*1*/string/*2*/ { }

verify.errorExistsBetweenMarkers('1', '2');
verify.numberOfErrorsInCurrentFile(1);