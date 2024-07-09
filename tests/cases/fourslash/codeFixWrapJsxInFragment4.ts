/// <reference path='fourslash.ts' />

// @jsx: react-jsxdev
// @Filename: /a.tsx
////[|<a></a><a />|]

verify.rangeAfterCodeFix(`<><a></a><a /></>`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 0);
