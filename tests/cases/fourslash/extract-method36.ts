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
////class Foo {
////    foo() {
////        const arg = b;
////        /*a*/console.log(arg);/*b*/
////    }
////}

goTo.file("/c.ts");
goTo.select("a", "b");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_1",
  actionDescription: "Extract to method in class 'Foo'",
  newContent:
`import { b, B } from "./b";
import { A } from "./a";

class Foo {
    foo() {
        const arg = b;
        this./*RENAME*/newMethod(arg);
    }

    private newMethod(arg: B<A>) {
        console.log(arg);
    }
}`
});
