// See GH#18461

/// <reference path='fourslash.ts' />

////declare const x: typeof A | typeof B;
////x./**/f;
////
////namespace A {
////    export function f() {}
////}
////namespace B {
////    export function f() {}
////}

verify.quickInfoAt("", "(method) f(): void");
