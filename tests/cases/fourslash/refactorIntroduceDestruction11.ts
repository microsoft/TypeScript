/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2
//// }
//// call(/*a*/item/*b*/["a"], item.b)

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
    newContent: `const item = {
    a: 1, b: 2
}
const { "a": a, b } = item
call(a, b)`,
});
