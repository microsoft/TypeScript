/// <reference path='fourslash.ts' />

////let a = { b: { c: { d: 0 } } };
/////*1a*/a || a.b && a.b.c && a.b.c.d;/*1b*/
/////*2a*/a && a.b || a.b.c && a.b.c.d;/*2b*/
/////*3a*/a && a.b && a.b.c || a.b.c.d;/*3b*/
/////*4a*/a ?? a.b && a.b.c && a.b.c.d;/*4b*/
/////*5a*/a && a.b ?? a.b.c || a.b.c.d;/*5b*/
/////*6a*/a && a.b && a.b.c ?? a.b.c.d;/*6b*/

// Only offer refactor for && chains.
goTo.select("1a", "1b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert to optional chain expression");

goTo.select("2a", "2b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert to optional chain expression");

goTo.select("3a", "3b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert to optional chain expression");

goTo.select("4a", "4b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert to optional chain expression");

goTo.select("5a", "5b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert to optional chain expression");

goTo.select("6a", "6b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert to optional chain expression");
