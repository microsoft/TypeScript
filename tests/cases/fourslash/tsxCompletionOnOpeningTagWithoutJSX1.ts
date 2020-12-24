/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x = </**/;

verify.completions({ marker: "", exact: [completion.globalThisEntry, ...completion.globalsVars, completion.undefinedVarEntry] });
