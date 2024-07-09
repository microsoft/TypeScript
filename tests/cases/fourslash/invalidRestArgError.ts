/// <reference path="fourslash.ts"/>

////function b(.../*1*/)/*2*/ {}  

verify.errorExistsBetweenMarkers('1', '2');
