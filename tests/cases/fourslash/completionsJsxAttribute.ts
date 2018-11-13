/// <reference path="fourslash.ts" />

// @jsx: preserve

// @Filename: /a.tsx
////declare namespace JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {
////            /** Doc */
////            foo: boolean;
////            bar: string;
////        }
////    }
////}
////
////<div /**/></div>;

const exact: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
    { name: "foo", kind: "JSX attribute", kindModifiers: "declare", text: "(JSX attribute) foo: boolean", documentation: "Doc" },
    { name: "bar", kind: "JSX attribute", kindModifiers: "declare", text: "(JSX attribute) bar: string" },
];
verify.completions({ marker: "", exact });
edit.insert("f");
verify.completions({ exact });
edit.insert("oo ");
verify.completions({ exact: exact[1] });
edit.insert("b");
verify.completions({ exact: exact[1] });
