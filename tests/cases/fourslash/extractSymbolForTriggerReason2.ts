/// <reference path='fourslash.ts' />

////const foo = ba/*a*/r + b/*b*/az;

// Expand selection to fit nodes if refactors are explicitly requested
goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Extract Symbol");
verify.refactorAvailableForTriggerReason("invoked", "Extract Symbol", "constant_scope_0");
