/// <reference path='fourslash.ts' />

//// var x: str/*a*//*b*/ing;

// Only offer refactor for empty span if explicity requested
goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Extract type");
verify.refactorAvailableForTriggerReason("invoked", "Extract type");
