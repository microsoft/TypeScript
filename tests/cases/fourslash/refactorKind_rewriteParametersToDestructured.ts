/// <reference path='fourslash.ts' />

//// function(/*a*/a: number, b: number/*b*/): number {}

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.rewrite",
[
    "refactor.rewrite.parameters.toDestructured"
]);
