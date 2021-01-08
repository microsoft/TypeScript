/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2
//// }
//// call(item.a, /*a*/item/*b*/.b)

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `const item = {
    a: 1, b: 2
}
const { a, b } = item
call(a, b)`,
});
