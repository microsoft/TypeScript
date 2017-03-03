/// <reference path='fourslash.ts' />

//// enum E { member }
//// abstract class A {
////     abstract x: E;
////     abstract y: E.member;
//// }
////
//// class C extends A {[| |]}

verify.rangeAfterCodeFix(`
    x: E;
    y: E;
`);