/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
//// declare function bar1<P extends "" | "bar" | "baz">(p: P): void;
////
//// bar1("/*ts*/")
////

verify.completions({ marker: ["ts"], exact: ["", "bar", "baz"] });
