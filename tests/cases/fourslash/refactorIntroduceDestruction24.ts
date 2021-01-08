/// <reference path='fourslash.ts' />

//// function foo () {
////     call(item.a)
//// }
//// const item = { a: 1, b: 2 }
//// function bar () {
////     call(/*a*/item/*b*/.a)
//// }
//// const aa = item.b

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `function foo () {
    call(item.a)
}
const item = { a: 1, b: 2 }
const { a, b } = item
function bar () {
    call(a)
}
const aa = b`,
});
