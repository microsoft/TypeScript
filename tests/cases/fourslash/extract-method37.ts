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
////class Foo {
////    foo() {
////        const arg = c;
////        /*a*/console.log(arg);/*b*/
////    }
////}

goTo.file("/d.ts");
goTo.select("a", "b");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_1",
  actionDescription: "Extract to method in class 'Foo'",
  newContent:
`import { c, C } from "./c";
import { B } from "./b";
import { A } from "./a";

class Foo {
    foo() {
        const arg = c;
        this./*RENAME*/newMethod(arg);
    }

    private newMethod(arg: C<B<A>>) {
        console.log(arg);
    }
}`
});
