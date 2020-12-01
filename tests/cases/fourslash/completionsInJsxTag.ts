/// <reference path="fourslash.ts" />

// @jsx: preserve

// @Filename: /a.tsx
////declare namespace JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {
////            /** Doc */
////            foo: string
////            /** Label docs */
////            "aria-label": string
////        }
////    }
////}
////class Foo {
////    render() {
////        <div /*1*/ ></div>;
////        <div  /*2*/ />
////    }
////}

verify.completions({
    marker: ["1", "2"],
    exact: [
        {
            name: "foo",
            text: "(JSX attribute) foo: string",
            documentation: "Doc",
            kind: "JSX attribute",
            kindModifiers: "declare",
        },
        {
            name: "aria-label",
            text: "(JSX attribute) \"aria-label\": string",
            documentation: "Label docs",
            kind: "JSX attribute",
            kindModifiers: "declare",
        },
    ],
});
