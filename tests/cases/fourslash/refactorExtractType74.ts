/// <reference path='fourslash.ts' />

// @Filename: a.ts
//// interface Foo<T extends { prop: [|T|] }> {}

// @Filename: b.ts
//// // Some initial comments.
//// // We need to ensure these files have different contents,
//// // so their ranges differ, so we'll start a few lines below in this file.
//// interface Foo<T extends { prop: [|T|] }> {}

for (const range of test.ranges()) {
    goTo.selectRange(range);
    verify.not.refactorAvailable("Extract type", "Extract to type alias");
}
