/// <reference path='fourslash.ts' />

//// /*a*/import * as m from "m";/*b*/

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.rewrite",
[
    "refactor.rewrite.import.named"
]);
