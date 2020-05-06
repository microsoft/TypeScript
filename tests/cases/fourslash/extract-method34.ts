/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export interface A {
////    x: number;
////}

// @Filename: /b.ts
////export interface B<T> {
////    payload: T;
////}

// @Filename: /c.ts
////import { A } from "./a";
////import { B } from "./b";
////export interface C<T> {
////    payload: T;
////}
////
////export const c: C<B<A>> = {
////    payload: {
////        payload: { x: 1 }
////    }
////}

// @Filename: /d.ts
////import { c } from "./c";
////
////function foo() {
////    const prop = c;
////    /*a*/console.log(prop);/*b*/
////}

goTo.file("/c.ts");
goTo.select("a", "b");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_1",
  actionDescription: "Extract to function in module scope",
  newContent:
`import { c, C } from "./c";
import { B } from "./b";
import { A } from "./a";

function foo() {
    const prop = c;
    /*RENAME*/newFunction(prop);
}

function newFunction(prop: C<B<A>>) {
    console.log(prop);
}
`
});
