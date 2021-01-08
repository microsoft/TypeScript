/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: () => 1
//// }
//// call(/*a*/item/*b*/.a, item.b())

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `const item = {
    a: 1, b: () => 1
}
const { a } = item
call(a, item.b())`,
});
