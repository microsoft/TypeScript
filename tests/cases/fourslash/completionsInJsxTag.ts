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
////class Foo {
////    render() {
////        <div /*1*/ ></div>;
////        <div  /*2*/ />
////    }
////}

goTo.marker("1");
verify.completionListCount(1);
verify.completionListContains("foo", "(JSX attribute) foo: string", "Doc", "JSX attribute");
goTo.marker("2");
verify.completionListCount(1);
verify.completionListContains("foo", "(JSX attribute) foo: string", "Doc", "JSX attribute");
