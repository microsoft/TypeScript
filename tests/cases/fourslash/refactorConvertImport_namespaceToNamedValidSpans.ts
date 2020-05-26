/// <reference path='fourslash.ts' />

/////*1a*/im/*2a*/port * as /*3a*//*3b*/m from "m/*2b*/";/*1b*/

// verify that the refactor is offered for full, partial, and empty spans.
for (const m of ["1", "2", "3"]) {
    goTo.select(m + "a", m + "b");
    verify.refactorAvailableForTriggerReason("invoked","Convert import", "Convert namespace import to named imports");
}
