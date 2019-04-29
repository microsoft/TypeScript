/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x = </**/;

verify.completions({ marker: "", exact: ["globalThis", ...completion.globalsVars, "x", "undefined"] });
