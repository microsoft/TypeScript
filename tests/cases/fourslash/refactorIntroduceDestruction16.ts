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
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: "Convert access to destruction",
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
