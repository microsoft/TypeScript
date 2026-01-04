/// <reference path='fourslash.ts' />

//// const name = "foo";
////
//// export class C1 {
////   [/*a*/name/*b*/](a: string, b: number) {}
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `const name = "foo";

export class C1 {
  [name]({ a, b }: { a: string; b: number; }) {}
}`
});