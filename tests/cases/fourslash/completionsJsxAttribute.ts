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
    { name: "bar", kind: "property", kindModifiers: "declare", text: "(property) bar: string" },
    { name: "foo", kind: "property", kindModifiers: "declare", text: "(property) foo: boolean", documentation: "Doc" },
];
verify.completions({ marker: "", exact });
edit.insert("f");
verify.completions({ exact });
edit.insert("oo ");
verify.completions({ exact: exact[0] });
edit.insert("b");
verify.completions({ exact: exact[0] });
