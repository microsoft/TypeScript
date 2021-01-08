/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: {
////         c: {
////             d: 1,
////             e: 2
////         }   
////     }
//// }
//// call(item.a, item.b, /*a*/item.b/*b*/.c, item.b.c.d, item.b.c.e)

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
const { c } = item.b
call(item.a, item.b, c, c.d, c.e)`,
});

