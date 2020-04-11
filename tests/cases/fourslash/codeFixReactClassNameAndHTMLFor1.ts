/// <reference path='fourslash.ts' />

// @jsx: react
// @Filename: /a.tsx
////declare namespace JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {
////            className?: string
////        }
////    }
////}
////[|const div = <div class="a" />|]

verify.rangeAfterCodeFix(`const div = <div className="a" />`, /*includeWhiteSpace*/false, /*errorCode*/ 2322, /*index*/ 0);
