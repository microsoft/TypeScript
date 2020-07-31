/// <reference path='fourslash.ts' />

//// interface A {
////     f: 1,
////     b: number
////     c: () => void
//// }
//// interface B {
////     f: 2,
////     b: number
////     c: () => string
//// }
//// declare const a: A | B
//// if (/*a*/a/*b*/.f === 1) {
////     a.b = 1
//// } else {
////     a.b = 2
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Introduce Destruction",
    actionName: "Introduce Destruction",
    actionDescription: "Convert property access to Object destruction",
    newContent: `interface A {
    f: 1,
    b: number
    c: () => void
}
interface B {
    f: 2,
    b: number
    c: () => string
}
declare const a: A | B
const { f } = a
if (f === 1) {
    a.b = 1
} else {
    a.b = 2
}`,
});
