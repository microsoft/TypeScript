/// <reference path='fourslash.ts' />

//// const a = (a: number) => { return/*a*//*b*/ a; };

// an invoked refactor request for a cursor in the body should return a refactor
goTo.select("a", "b");
verify.refactorAvailableForTriggerReason("invoked","Add or remove braces in an arrow function", "Remove braces from arrow function");