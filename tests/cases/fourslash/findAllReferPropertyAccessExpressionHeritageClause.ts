/// <reference path="fourslash.ts" />

//// class B {}
//// function foo() {
////     return {/*1*/B: B};
//// }
//// class C extends (foo())./*2*/B {}
//// class C1 extends foo()./*3*/B {}

verify.baselineFindAllReferences('1', '2', '3');
