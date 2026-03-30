/// <reference path='fourslash.ts' />

//// const a = (a: number) => { re/*a*/tur/*b*/n a; };

// Only offer refactor in body if explicitly requested
goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Add or remove braces in an arrow function");
verify.refactorAvailableForTriggerReason("invoked", "Add or remove braces in an arrow function", "Remove braces from arrow function");
