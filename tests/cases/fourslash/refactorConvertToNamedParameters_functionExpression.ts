/// <reference path='fourslash.ts' />

////const foo = /*a*/function/*b*/(a: number, b: number) { };
////foo(1, 2);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `const foo = function({ a, b }: { a: number; b: number; }) { };
foo({ a: 1, b: 2 });`
});