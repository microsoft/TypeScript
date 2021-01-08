/// <reference path='fourslash.ts' />

//// function f(item: { a: 1 }, b = item.a) {
////     call(/*a*/item/*b*/.a, b)
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `function f(item: { a: 1 }, b = item.a) {
    const { a } = item;
    call(a, b)
}`,
});
