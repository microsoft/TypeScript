/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x = 'something'
//// var y = </**/;

verify.completions({ marker: "", exact: completion.sorted([completion.globalThisEntry, ...completion.globalsVars, "x", completion.undefinedVarEntry]) });
