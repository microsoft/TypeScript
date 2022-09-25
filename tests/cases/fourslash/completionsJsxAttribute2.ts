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
////            "aria-foo": boolean;
////        }
////    }
////}
////
////<div foo /*1*/></div>;
////<div foo={true} /*2*/></div>;
////<div bar="test" /*3*/></div>;
////<div aria-foo /*4*/></div>;


verify.completions({ marker: "1", exact: ["aria-foo", "bar"] });
verify.completions({ marker: "2", exact: ["aria-foo", "bar"] });
verify.completions({ marker: "3", exact: ["aria-foo", "foo"] });
verify.completions({ marker: "4", exact: ["bar", "foo"] });
