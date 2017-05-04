/// <reference path='fourslash.ts' />

//// abstract class A {
////    private abstract x: number;
//// }
////
//// class C extends A {[| |]}

// We don't know how to fix this problem. We can:
// 1) Make x protected, and then insert.
// 2) Make x private, and then insert.
// 3) Make x not abstract.
// So we offer no fixes.
verify.not.codeFixAvailable();
