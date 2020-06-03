/// <reference path='fourslash.ts' />

////function foo() {
////    return 1/*a*//*b*/00;
////}

// Only offer refactor for empty span if explicity requested
goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Extract Symbol");
verify.refactorAvailableForTriggerReason("invoked", "Extract Symbol", "constant_scope_0");
