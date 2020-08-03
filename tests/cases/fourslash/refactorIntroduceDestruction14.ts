/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: {
////         c: {
////             d: 1,
////             e: 2
////         }   
////     }
//// }
//// call(/*a*/item/*b*/.a, item.b, item.b.c, item.b.c.d, item.b.c.e)

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
const { a, b } = item
call(a, b, b.c, b.c.d, b.c.e)`,
});
