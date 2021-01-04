/// <reference path='fourslash.ts' />

//// const arrow = () /*a*/=>/*b*/ 1;

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.rewrite",
[
    "refactor.rewrite.arrow.braces.add",
    "refactor.rewrite.function.named",
    "refactor.rewrite.function.anonymous",
    "refactor.rewrite.function.returnType"
]);
