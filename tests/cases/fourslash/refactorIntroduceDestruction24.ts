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
    refactorName: "Introduce destruction",
    actionName: "Introduce destruction",
    actionDescription: "Convert access to destruction",
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
