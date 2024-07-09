/// <reference path='fourslash.ts' />

//// /*a*/declare function foo(): void;
//// declare function foo(a: string): void;/*b*/

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.rewrite",
[
    "refactor.rewrite.function.overloadList"
]);
