/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export interface A {
////    x: number;
////}
////export const a: A = { x: 1 };

// @Filename: /b.ts
////import { a } from "./a";
////
////class Foo {
////    foo() {
////        const arg = a;
////        /*a*/console.log(arg);/*b*/
////    }
////}

goTo.file("/b.ts");
goTo.select("a", "b");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_1",
  actionDescription: "Extract to method in class 'Foo'",
  newContent:
`import { a, A } from "./a";

class Foo {
    foo() {
        const arg = a;
        this./*RENAME*/newMethod(arg);
    }

    private newMethod(arg: A) {
        console.log(arg);
    }
}`
});
