/// <reference path='fourslash.ts' />

/////*a1*/im/*a2*/port { /*a3*//*b3*/x, y as z, T } fro/*b2*/m "m";/*b1*/

// verify that the refactor is offered for full, partial, and empty spans.
for (const m of ["1", "2", "3"]) {
    goTo.select("a" + m, "b" + m);
    verify.refactorAvailableForTriggerReason("invoked", "Convert import", "Convert named imports to namespace import");
}
