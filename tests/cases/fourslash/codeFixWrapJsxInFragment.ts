/// <reference path='fourslash.ts' />

// @jsx: react
// @Filename: /a.tsx
////[|<a /><a />|]

verify.rangeAfterCodeFix(`<><a /><a /></>`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 0);
