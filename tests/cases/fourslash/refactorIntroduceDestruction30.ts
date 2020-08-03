/// <reference path='fourslash.ts' />

//// const item = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] as const
//// call(/*a*/item/*b*/[14], item[8], item[3])

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
    newContent: `const item = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] as const
const [, , , index_3, , , , , index_8, , , , , , index_14] = item
call(index_14, index_8, index_3)`,
});
