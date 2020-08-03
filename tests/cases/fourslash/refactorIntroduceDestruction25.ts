/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2, c: 3
//// }
//// call(/*a*/item/*b*/.a, item.a)

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: "Convert access to destruction",
    newContent: `const item = {
    a: 1, b: 2, c: 3
}
const { a } = item
call(a, a)`,
});
