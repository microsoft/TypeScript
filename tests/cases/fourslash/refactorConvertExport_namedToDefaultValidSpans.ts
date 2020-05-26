/// <reference path='fourslash.ts' />

/////*1a*/ex/*2a*/port f/*3a*//*3b*/unctio/*2b*/n f() {}/*1b*/

// verify that the refactor is offered for full, partial, and empty spans.
for (const m of ["1", "2", "3"]) {
    goTo.select(m + "a", m + "b");
    verify.refactorAvailableForTriggerReason("invoked", "Convert export", "Convert named export to default export");
}
