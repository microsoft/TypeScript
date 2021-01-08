/// <reference path='fourslash.ts' />

//// function f(item: { a: 1 }, b = item.a) {
////     call(/*a*/item/*b*/.a, b)
////     call(item.a, b)
//// }


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    triggerReason: 'invoked',
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `function f(item: { a: 1 }, b = item.a) {
    const { a } = item
    call(a, b)
    call(a, b)
}`,
});
