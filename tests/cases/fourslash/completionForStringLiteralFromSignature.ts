/// <reference path='fourslash.ts'/>

////declare function f(a: "x"): void;
////declare function f(a: string): void;
////f("/**/");

verify.completionsAt("", ["x"], { isNewIdentifierLocation: true });
