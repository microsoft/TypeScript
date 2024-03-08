/// <reference path='fourslash.ts'/>

////declare function f(a: "x"): void;
////declare function f(a: string, b: number): void;
////f("/**/", 0);

verify.completions({ marker: "", exact: [], isNewIdentifierLocation: false });
