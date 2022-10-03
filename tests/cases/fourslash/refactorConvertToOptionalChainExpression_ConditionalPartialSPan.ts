/// <reference path='fourslash.ts' />

////let foo = { bar: { baz: 0 } };
////f/*a*/oo.bar ? foo.bar.baz : "when/*b*/False";

// allow partial spans
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let foo = { bar: { baz: 0 } };
foo.bar?.baz ?? "whenFalse";`
});