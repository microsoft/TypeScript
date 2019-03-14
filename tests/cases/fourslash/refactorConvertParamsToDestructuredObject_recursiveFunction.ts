/// <reference path='fourslash.ts' />

////const f = function foo(/*a*/a: number, b: number/*b*/) {
////    foo(1, 2);
////}
////function foo(a: number, b: number) { }
////foo(3, 4);


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `const f = function foo({ a, b }: { a: number; b: number; }) {
    foo({ a: 1, b: 2 });
}
function foo(a: number, b: number) { }
foo(3, 4);`
});