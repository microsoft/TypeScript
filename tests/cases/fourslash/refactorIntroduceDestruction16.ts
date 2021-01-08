/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: {
////         c: {
////             d: 1,
////             e: 2
////         }   
////     }
//// }
//// call(item.a, item.b, item.b.c, /*a*/item.b.c/*b*/.d, item.b.c.e)

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `const item = {
    a: 1, b: {
        c: {
            d: 1,
            e: 2
        }   
    }
}
const { d, e } = item.b.c
call(item.a, item.b, item.b.c, d, e)`,
});
