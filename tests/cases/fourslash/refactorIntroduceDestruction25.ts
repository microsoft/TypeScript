/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2, c: 3
//// }
//// call(/*a*/item/*b*/.a, item.a)

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
    newContent: `const item = {
    a: 1, b: 2, c: 3
}
const { a } = item
call(a, a)`,
});
