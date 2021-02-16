/// <reference path='fourslash.ts' />

////let foo = { bar: { baz: 0 } };
////f(foo && foo.ba/*a*//*b*/r && foo.bar.baz);

// allow for call arguments
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let foo = { bar: { baz: 0 } };
f(foo?.bar?.baz);`,
    triggerReason: "invoked"
});