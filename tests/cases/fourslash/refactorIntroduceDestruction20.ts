/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2
//// }
//// if (Math.random() < 0.5) {
////     call(/*a*/item/*b*/.a)
//// } else {
////     call(item.b)
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: "Convert access to destruction",
    newContent: `const item = {
    a: 1, b: 2
}
const { a, b } = item
if (Math.random() < 0.5) {
    call(a)
} else {
    call(b)
}`,
});
