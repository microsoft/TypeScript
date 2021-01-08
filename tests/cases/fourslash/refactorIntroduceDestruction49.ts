/// <reference path='fourslash.ts' />

//// function foo (item: { a: string, b: number }) {
////     call(item./*a*/a/*b*/, item.b)
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    triggerReason: 'invoked',
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `function foo (item: { a: string, b: number }) {
    const { a } = item;
    call(a, item.b)
}`,
});
