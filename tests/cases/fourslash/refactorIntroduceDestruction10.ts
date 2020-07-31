/// <reference path='fourslash.ts' />

//// function foo (item: { a: string, b: number }) {
////     call(/*a*/item/*b*/.a, item.b)
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
    newContent: `function foo (item: { a: string, b: number }) {
    const { a, b } = item;
    call(a, b)
}`,
});
