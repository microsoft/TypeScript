/// <reference path='fourslash.ts' />

//// /*a*/foo && foo.bar/*b*/

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.rewrite",
[
    "refactor.rewrite.expression.optionalChain"
]);

