/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2, c: 3
//// }
//// call(/*a*/item/*b*/.a, item.a)

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `const item = {
    a: 1, b: 2, c: 3
}
const { a } = item
call(a, a)`,
});
