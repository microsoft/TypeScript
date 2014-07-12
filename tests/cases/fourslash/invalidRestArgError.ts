/// <reference path="fourslash.ts"/>

// Bug 17898: Error span is incorrect making errors hard to spot

//function a(/*1*/.../*2*/) {}   
// Error info should be between *1* and *2* markers, but is as per line below.
////function b(.../*1*/)/*2*/ {}  

verify.errorExistsBetweenMarkers('1', '2');