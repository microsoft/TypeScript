/// <reference path='fourslash.ts' />

// @Filename: a.ts
////export interface A {
////    x: number;
////}

// @Filename: b.ts
////import { A } from "./a";
////export interface B<T> {
////    payload: T;
////}
////export function create(fn: (args: B<A>) => void) {}

// @Filename: c.ts
////import { create } from "./b";
////class C {
////    bar() {
////        create(args => this.foo(args));
////    }
////}

goTo.file("c.ts");
verify.codeFix({
    description: [ts.Diagnostics.Declare_method_0.message, "foo"],
    index: 0,
    newFileContent:
`import { create, B } from "./b";
import { A } from "./a";
class C {
    bar() {
        create(args => this.foo(args));
    }
    foo(args: B<A>): void {
        throw new Error("Method not implemented.");
    }
}`
});
