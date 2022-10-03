/// <reference path='fourslash.ts' />

////let foo = { bar: { baz: 0 } };
////f/*a*/oo && foo.bar && foo.bar.ba/*b*/z;

// allow partial spans
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let foo = { bar: { baz: 0 } };
foo?.bar?.baz;`
});