/// <reference path='fourslash.ts' />

// @lib: es5

//@Filename: file.tsx
//// var x = 'something'
//// var y = </**/;

verify.completions({ marker: "", unsorted: [completion.globalThisEntry, ...completion.globalsVars, "x", completion.undefinedVarEntry] });
