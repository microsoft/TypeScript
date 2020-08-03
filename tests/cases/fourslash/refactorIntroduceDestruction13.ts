/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2
//// }
//// const a = false
//// call(/*a*/item/*b*/.a, item.b)

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: "Convert access to destruction",
    newContent: `const item = {
    a: 1, b: 2
}
const a = false
const { a: a_1, b } = item
call(a_1, b)`,
});
