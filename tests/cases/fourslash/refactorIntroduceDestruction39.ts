/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2
//// }
//// call(it/*a*/em.a, item.b)

goTo.marker('a');
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    triggerReason: 'invoked',
    newContent: `const item = {
    a: 1, b: 2
}
const { a, b } = item
call(a, b)`,
});
