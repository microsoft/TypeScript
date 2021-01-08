/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2
//// }
//// call(
////     // l
////     /*a*/item/*b*/.a,
////     // t
////     item.b
//// )

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `const item = {
    a: 1, b: 2
}
const { a, b } = item
call(
    // l
    a,
    // t
    b
)`,
});


