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


verify.completions({ marker: "1", exact: ["bar", "aria-foo"] });
verify.completions({ marker: "2", exact: ["bar", "aria-foo"] });
verify.completions({ marker: "3", exact: ["foo", "aria-foo"] });
verify.completions({ marker: "4", exact: ["foo", "bar"] });
