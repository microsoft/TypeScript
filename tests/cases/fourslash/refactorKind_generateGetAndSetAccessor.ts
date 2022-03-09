/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public a: string;/*b*/
//// }

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.rewrite.property",
[
    "refactor.rewrite.property.generateAccessors"
]);
