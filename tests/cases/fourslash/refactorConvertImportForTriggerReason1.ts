/// <reference path='fourslash.ts' />

////import /*a*//*b*/d, * as n from "m";

// Only offer refactor for empty span if explicity requested
goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert import");
verify.refactorAvailableForTriggerReason("invoked", "Convert import");
