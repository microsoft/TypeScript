/// <reference path='fourslash.ts' />

//// const item = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ] as const
//// call(/*a*/item/*b*/[14], item[8], item[16])

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: "Convert access to destruction",
    newContent: `const item = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ] as const
const { 14: index_14, 8: index_8, 16: index_16 } = item
call(index_14, index_8, index_16)`,
});
