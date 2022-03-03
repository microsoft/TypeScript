/// <reference path="fourslash.ts" />

//// /*1*/export = 0;/*2*/

goTo.select("1", "2");
verify.not.refactorAvailable("Extract Symbol");
