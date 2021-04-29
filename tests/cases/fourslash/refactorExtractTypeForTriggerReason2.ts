/// <reference path='fourslash.ts' />

//// var x: s/*a*/tr/*b*/ing;

goTo.select("a", "b");
verify.refactorAvailableForTriggerReason("implicit", "Extract type");
verify.refactorAvailableForTriggerReason("invoked", "Extract type");
