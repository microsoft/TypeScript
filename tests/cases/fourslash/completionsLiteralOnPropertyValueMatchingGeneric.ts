/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
//// declare function bar1<P extends "" | "bar" | "baz">(p: { type: P }): void;
////
//// bar1({ type: "/*ts*/" })
////

verify.completions({ marker: ["ts"], exact: ["", "bar", "baz"] });
