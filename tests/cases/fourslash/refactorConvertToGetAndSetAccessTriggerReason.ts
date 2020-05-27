/// <reference path='fourslash.ts' />

//// class A {
////     public /*a*//*b*/a: string;
//// }

goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Generate 'get' and 'set' accessors");
verify.refactorAvailableForTriggerReason("invoked", "Generate 'get' and 'set' accessors");