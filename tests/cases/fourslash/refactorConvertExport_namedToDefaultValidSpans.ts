/// <reference path='fourslash.ts' />

/////*a1*/ex/*a2*/port f/*a3*//*b3*/unctio/*b2*/n f() {}/*b1*/

// verify that the refactor is offered for full, partial, and empty spans.
for (const m of ["1", "2", "3"]) {
    goTo.select("a" + m, "b" + m);
    verify.refactorAvailableForTriggerReason("invoked", "Convert export", "Convert named export to default export");
}
