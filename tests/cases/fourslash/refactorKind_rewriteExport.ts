/// <reference path='fourslash.ts' />

//// /*a*/export function f() {}/*b*/

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.rewrite.export",
[
    "refactor.rewrite.export.default"
]);
