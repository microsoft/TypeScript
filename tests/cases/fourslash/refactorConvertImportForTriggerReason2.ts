/// <reference path='fourslash.ts' />

////import d, * as /*a*/n/*b*/ from "m";

// Only offer refactor for sub span if explicity requested
goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert import");
verify.refactorAvailableForTriggerReason("invoked", "Convert import");
