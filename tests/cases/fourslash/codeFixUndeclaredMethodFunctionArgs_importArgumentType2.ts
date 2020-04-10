/// <reference path='fourslash.ts' />

// @Filename: a.ts
////export interface A {
////    x: number;
////}

// @Filename: b.ts
////export interface B<T> {
////    payload: T;
////}

// @Filename: c.ts
////import { A } from "./a";
////import { B } from "./b";
////export interface C<T> {
////    payload: T;
////}
////export function create(fn: (args: C<B<A>>) => void) {}

// @Filename: d.ts
////import { create } from "./c";
////class D {
////    bar() {
////        create(args => this.foo(args));
////    }
////}

goTo.file("d.ts");
verify.codeFix({
    description: [ts.Diagnostics.Declare_method_0.message, "foo"],
    index: 0,
    newFileContent:
`import { create, C } from "./c";
import { B } from "./b";
import { A } from "./a";
class D {
    bar() {
        create(args => this.foo(args));
    }
    foo(args: C<B<A>>): void {
        throw new Error("Method not implemented.");
    }
}`
});
