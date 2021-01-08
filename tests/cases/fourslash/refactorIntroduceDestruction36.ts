/// <reference path='fourslash.ts' />

//// const item = {
////     a: {
////         b: {
////             c: 1
////         }
////     }
//// }
//// /*a*/item.a/*b*/.b.c // left of b.c
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
const { b } = item.a
b.c // left of b.c
b.c // another reference`,
});


