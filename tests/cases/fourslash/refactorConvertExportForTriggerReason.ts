/// <reference path='fourslash.ts' />

////export /*a*//*b*/function f() {}

// Only offer refactor for empty span if explicity requested
goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert export");
verify.refactorAvailableForTriggerReason("invoked", "Convert export");
