/// <reference path='fourslash.ts' />

//// const a = (a: number) => { return/*a*//*b*/ a; };

// Only offer refactor for empty span in body if explicity requested
goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Add or remove braces in an arrow function");
verify.refactorAvailableForTriggerReason("invoked", "Add or remove braces in an arrow function", "Remove braces from arrow function");
