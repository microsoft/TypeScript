/// <reference path='fourslash.ts'/>

////class C<T> {
////    static foo(x: number) { }
////    x: T;
////}
////
////module C {
////    export function f(x: typeof C) {
////        x./*1*/
////        var /*3*/r = new /*2*/x<number>();
////        var /*5*/r2 = r./*4*/
////        return typeof r;
////    }
////}

verify.completions({ at: "1", includes: ["f", "foo"] });
edit.insert('foo(1);');

verify.completions({ at: "2", includes: "x" });

verify.quickInfoAt("3", "(local var) r: C<number>");

verify.completions({ at: "4", includes: "x" });
edit.insert('x;');

verify.quickInfoAt("5", "(local var) r2: number");

verify.noErrors();