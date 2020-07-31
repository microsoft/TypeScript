/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: () => void
//// }
//// item.a = 2
//// call(/*a*/item/*b*/.a, item.b())

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
    newContent: `const item = {
    a: 1, b: () => void
}
item.a = 2
const { a } = item
call(a, item.b())`,
});
