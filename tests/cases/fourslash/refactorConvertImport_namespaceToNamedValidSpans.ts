/// <reference path='fourslash.ts' />

/////*a1*/im/*a2*/port * as /*a3*//*b3*/m from "m/*b2*/";/*b1*/

// verify that the refactor is offered for full, partial, and empty spans.
for (const m of ["1", "2", "3"]) {
    goTo.select("a" + m, "b" + m);
    verify.refactorAvailable("Convert import", "Convert namespace import to named imports");
}

