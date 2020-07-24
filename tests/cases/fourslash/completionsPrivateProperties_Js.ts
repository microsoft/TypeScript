/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.d.ts
////declare namespace A {
////    class Foo {
////        constructor();
////
////        private m1(): void;
////        protected m2(): void;
////
////        m3(): void;
////    }
////}

// @filename: b.js
////let foo = new A.Foo();
////foo./**/

verify.completions({ marker: [""], includes: ["m3"], excludes: ["m1", "m2"] });
