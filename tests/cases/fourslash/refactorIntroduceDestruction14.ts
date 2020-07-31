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
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
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
