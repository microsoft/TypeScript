/// <reference path='fourslash.ts' />

//// function foo (item: { a: string, b: number }) {
////     call(/*a*/item/*b*/.a, item.b)
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `function foo (item: { a: string, b: number }) {
    const { a, b } = item;
    call(a, b)
}`,
});
