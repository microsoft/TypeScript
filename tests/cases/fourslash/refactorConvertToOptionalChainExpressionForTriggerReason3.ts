/// <reference path='fourslash.ts' />

////let a = { b: { c: 0 } };
////a.b ? /*a*//*b*/a.b.c : "whenFalse";

// Only offer refactor for empty span if explicitly requested
goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert to optional chain expression");
verify.refactorAvailableForTriggerReason("invoked", "Convert to optional chain expression");
