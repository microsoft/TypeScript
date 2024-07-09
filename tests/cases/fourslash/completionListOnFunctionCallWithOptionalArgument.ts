/// <reference path="fourslash.ts" />

//// declare function Foo(arg1?: Function): { q: number };
//// Foo(function () { } )./**/;

verify.completions({ marker: "", exact: "q" });
