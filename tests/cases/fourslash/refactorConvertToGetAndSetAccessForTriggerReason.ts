/// <reference path='fourslash.ts' />

//// class A {
////     public /*a*//*b*/a: string;
//// }

// Only offer refactor for empty span if explicity requested
goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Generate 'get' and 'set' accessors");
verify.refactorAvailableForTriggerReason("invoked", "Generate 'get' and 'set' accessors");
