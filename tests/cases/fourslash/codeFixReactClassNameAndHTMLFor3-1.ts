/// <reference path='fourslash.ts' />

// @jsx: react
// @Filename: /a.tsx
////<div for="a" />;
////declare namespace JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {
////            className?: string
////        }
////        'my-tag': { className?: string }
////    }
////}

verify.not.codeFixAvailable("fixReactClassNameAndHTMLFor");
