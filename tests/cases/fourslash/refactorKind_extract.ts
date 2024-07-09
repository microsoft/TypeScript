/// <reference path='fourslash.ts' />

//// const foo: /*a*/string/*b*/ = /*c*/1/*d*/;

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.extract",
[
    "refactor.extract.type"
]);

goTo.select("c", "d");
verify.refactorKindAvailable("refactor.extract",
[
    "refactor.extract.constant",
    "refactor.extract.function"
]);
