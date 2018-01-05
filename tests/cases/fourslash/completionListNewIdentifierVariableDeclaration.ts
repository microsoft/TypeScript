/// <reference path='fourslash.ts' />

////var x : (s/*1*/

////var y : (s:string, list/*2*/

goTo.marker("1"); 
verify.not.completionListIsEmpty();// As this can either be type or become arrow function parameter
verify.completionListAllowsNewIdentifier();

goTo.marker("2");
verify.completionListIsEmpty(); // Parameter name
verify.completionListAllowsNewIdentifier();