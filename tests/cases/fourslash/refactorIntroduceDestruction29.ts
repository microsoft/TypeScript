/// <reference path='fourslash.ts' />

//// const item = [ 1, 2, 3 ] as const
//// call(/*a*/item/*b*/[0], item[2], item[2])

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `const item = [ 1, 2, 3 ] as const
const [index_0, , index_2] = item
call(index_0, index_2, index_2)`,
});
