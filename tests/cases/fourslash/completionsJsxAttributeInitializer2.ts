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

const [replacementSpan] = test.ranges();
goTo.marker("0");
verify.completionListContains("foo", "const foo: 0", undefined, "const", undefined, undefined, {
    includeInsertTextCompletions: true,
    insertText: "{foo}",
    replacementSpan,
});

verify.completionsAt(["1", "2"], ["b"]);
