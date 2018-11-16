/// <reference path='fourslash.ts'/>

////declare function f(a: "x"): void;
////declare function f(a: string): void;
////f("/**/");

verify.completions({ marker: "", exact: "x", isNewIdentifierLocation: true });
