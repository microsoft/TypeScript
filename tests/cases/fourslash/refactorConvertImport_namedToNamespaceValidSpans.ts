/// <reference path='fourslash.ts' />

/////*1a*/im/*2a*/port { /*3a*//*3b*/x, y as z, T } fro/*2b*/m "m";/*1b*/

// verify that the refactor is offered for full, partial, and empty spans.
for (const m of ["1", "2", "3"]) {
    goTo.select(m + "a", m + "b");
    verify.refactorAvailableForTriggerReason("invoked", "Convert import", "Convert named imports to namespace import");
}
