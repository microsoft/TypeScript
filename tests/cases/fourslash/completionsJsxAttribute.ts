/// <reference path="fourslash.ts" />

// @jsx: preserve

// @Filename: /a.tsx
////declare namespace JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {
////            /** Doc */
////            foo: string
////        }
////    }
////}
////
////<div /**/></div>;

goTo.marker();
verify.completionEntryDetailIs("foo", "(JSX attribute) foo: string", "Doc", "JSX attribute", []);
edit.insert("f");
verify.completionEntryDetailIs("foo", "(JSX attribute) foo: string", "Doc", "JSX attribute", []);

