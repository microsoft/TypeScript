/// <reference path='fourslash.ts' />

////function /*a*/foo/*b*/(// comment
////    a: number, b: number) { }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function foo(// comment
        { a, b }: { a: number; b: number }) { }`
});