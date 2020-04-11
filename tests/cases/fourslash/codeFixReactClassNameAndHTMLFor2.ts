/// <reference path='fourslash.ts' />

// @jsx: react
// @Filename: /a.tsx
////declare namespace JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        label: {
////            htmlFor?: string
////        }
////    }
////}
////[|<label for="a" />|]

verify.rangeAfterCodeFix(`<label htmlFor="a" />`, /*includeWhiteSpace*/false, /*errorCode*/ 2322, /*index*/ 0);
