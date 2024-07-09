/// <reference path='fourslash.ts' />

//// const foo = /*a*/"a" + bar/*b*/;

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.rewrite",
[
    "refactor.rewrite.string"
]);
