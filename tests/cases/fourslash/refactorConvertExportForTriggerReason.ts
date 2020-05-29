/// <reference path='fourslash.ts' />

////export /*a*//*b*/function f() {}

goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert export");
verify.refactorAvailableForTriggerReason("invoked", "Convert export");