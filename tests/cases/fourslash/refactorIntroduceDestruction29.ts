/// <reference path='fourslash.ts' />

//// const item = [ 1, 2, 3 ] as const
//// call(/*a*/item/*b*/[0], item[2], item[2])

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
    newContent: `const item = [ 1, 2, 3 ] as const
const [index_0, , index_2] = item
call(index_0, index_2, index_2)`,
});
