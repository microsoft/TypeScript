/// <reference path='fourslash.ts' />

////import /*a*//*b*/d, * as n from "m";

goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Convert import");
verify.refactorAvailableForTriggerReason("invoked", "Convert import");