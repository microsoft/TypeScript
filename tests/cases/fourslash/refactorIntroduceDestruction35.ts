/// <reference path='fourslash.ts' />

//// const item = {
////     a: {
////         b: {
////             c: 1
////         }
////     }
//// }
//// item./*a*/a/*b*/.b.c // right of item
//// item.a.b.c // another reference

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `const item = {
    a: {
        b: {
            c: 1
        }
    }
}
const { a } = item
a.b.c // right of item
a.b.c // another reference`,
});


