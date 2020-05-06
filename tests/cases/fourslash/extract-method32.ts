/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export interface A {
////    x: number;
////}
////export const a: A = { x: 1 };

// @Filename: /b.ts
////import { a } from "./a";
////
////function foo() {
////    const arg = a;
////    /*a*/console.log(arg);/*b*/
////}

goTo.file("/b.ts");
goTo.select("a", "b");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_1",
  actionDescription: "Extract to function in module scope",
  newContent:
`import { a, A } from "./a";

function foo() {
    const arg = a;
    /*RENAME*/newFunction(arg);
}

function newFunction(arg: A) {
    console.log(arg);
}
`
});
