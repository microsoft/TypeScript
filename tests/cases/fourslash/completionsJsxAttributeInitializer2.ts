/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
////const foo = 0;
////<div x=[|f/**/|] />;

const [replacementSpan] = test.ranges();
goTo.marker();
verify.completionListContains("foo", "const foo: 0", undefined, "const", undefined, undefined, {
    includeInsertTextCompletions: true,
    insertText: "{foo}",
    replacementSpan,
});
