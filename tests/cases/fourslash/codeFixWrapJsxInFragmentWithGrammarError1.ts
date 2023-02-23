/// <reference path='fourslash.ts' />

// @jsx: react-jsxdev
// @Filename: /a.tsx
////[|<div abc={{ foo = 10 }}></div><div abc={{ foo = 10 }}></div>|]

verify.rangeAfterCodeFix(`<><div abc={{ foo = 10 }}></div><div abc={{ foo = 10 }}></div></>`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 0);
