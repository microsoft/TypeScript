/// <reference path='fourslash.ts'/>
////interface A {
////    a: string;
////}
////declare function ctx(callback: (this: A) => string): string;
////ctx(function () { return th/*1*/is./*2*/a });

verify.quickInfoAt("1", "this: A");
verify.completions({ marker: "2", exact: { name: "a", text: "(property) A.a: string" } });
