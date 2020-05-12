/// <reference path='fourslash.ts' />

// @Filename: a.ts
////export interface A {
////    x: number;
////}
////export function create(fn: (args: A) => void) {}

// @Filename: b.ts
////import { create } from "./a";
////class B {
////    bar() {
////        create(args => this.foo(args));
////    }
////}

goTo.file("b.ts");
verify.codeFix({
    description: [ts.Diagnostics.Declare_method_0.message, "foo"],
    index: 0,
    newFileContent:
`import { create, A } from "./a";
class B {
    bar() {
        create(args => this.foo(args));
    }
    foo(args: A): void {
        throw new Error("Method not implemented.");
    }
}`
});
