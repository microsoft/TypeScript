/// <reference path='fourslash.ts' />

//// const item = { a: 1, b: 2 }
//// function foo() {
////     call(/*a*/item/*b*/.a)
//// }
//// function bar() {
////     call(item.b)
//// }
//// if (Math.max() < 0.5) {
////     call(item.a)
//// }
//// else {
////     call(item.b)
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to destruction",
    actionName: "Convert to destruction",
    actionDescription: ts.Diagnostics.Convert_access_expression_to_destruction.message,
    newContent: `const item = { a: 1, b: 2 }
const { a, b } = item
function foo() {
    call(a)
}
function bar() {
    call(b)
}
if (Math.max() < 0.5) {
    call(a)
}
else {
    call(b)
}`,
});

