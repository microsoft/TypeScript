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
            name: "aria-label",
            text: "(property) \"aria-label\": string",
            documentation: "Label docs",
            kind: "property",
            kindModifiers: "declare",
        },
        {
            name: "foo",
            text: "(property) foo: string",
            documentation: "Doc",
            kind: "property",
            kindModifiers: "declare",
        },
    ],
});
