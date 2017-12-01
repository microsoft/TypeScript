/// <reference path="fourslash.ts" />

////interface A { a: number; };
////interface B { a: number; b: number; };
////function f<T extends keyof A>(key: T) {}
////f("/*f*/");
////function g<T extends keyof B>(key: T) {}
////g("/*g*/");

goTo.marker("f");
verify.completionListCount(1);
verify.completionListContains("a");

goTo.marker("g");
verify.completionListCount(2);
verify.completionListContains("a");
verify.completionListContains("b");
