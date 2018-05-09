/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
////declare namespace JSX {
////    interface IntrinsicElements {
////        div: { a: string, b: string }
////    }
////}
////const foo = 0;
////<div x=[|f/*0*/|] />;
////
////<div a="1" b/*1*/ />
////<div a /*2*/ />

verify.completions(
    {
        marker: "0",
        includes: { name: "foo", text: "const foo: 0", kind: "const", insertText: "{foo}", replacementSpan: test.ranges()[0] },
        preferences: { includeInsertTextCompletions: true },
    },
    { marker: ["1", "2"], exact: "b" },
);
