/// <reference path='fourslash.ts' />

/////**
//// * /*a*//*b*/
//// * {@link Foo}
//// */

goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("invoked", "Extract Symbol");
