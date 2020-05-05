/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export interface A {
////    x: number;
////}

// @Filename: /b.ts
////import { A } from "./a";
////export interface B<T> {
////    payload: T;
////}
////export const b: B<A> = {
////    payload: { x: 1 }
////}

// @Filename: /c.ts
////import { b } from "./b";
////
////function foo() {
////    const prop = b;
////    /*a*/console.log(prop);/*b*/
////}

goTo.file("/c.ts");
goTo.select("a", "b");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_1",
  actionDescription: "Extract to function in module scope",
  newContent:
`import { b, B } from "./b";
import { A } from "./a";

function foo() {
    const prop = b;
    /*RENAME*/newFunction(prop);
}

function newFunction(prop: B<A>) {
    console.log(prop);
}
`
});
