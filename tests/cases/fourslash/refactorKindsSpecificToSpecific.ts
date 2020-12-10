/// <reference path='fourslash.ts' />

//// const a = /*a*/1/*b*/;

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.extract.constant", [
    "refactor.extract.constant"
]);
