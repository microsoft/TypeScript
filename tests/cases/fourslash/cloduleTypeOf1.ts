/// <reference path='fourslash.ts'/>

////class C<T> {
////    static foo(x: number) { }
////    x: T;
////}
////
////namespace C {
////    export function f(x: typeof C) {
////        x./*1*/
////        var /*3*/r = new /*2*/x<number>();
////        var /*5*/r2 = r./*4*/
////        return typeof r;
////    }
////}

verify.completions({
    marker: "1",
    includes: [
        { name: "f", sortText: completion.SortText.LocationPriority },
        { name: "foo", sortText: completion.SortText.LocalDeclarationPriority }
    ]
});
edit.insert('foo(1);');

verify.completions({ marker: "2", includes: "x" });

verify.quickInfoAt("3", "(local var) r: C<number>");

verify.completions({ marker: "4", includes: "x" });
edit.insert('x;');

verify.quickInfoAt("5", "(local var) r2: number");

verify.noErrors();