/// <reference path="fourslash.ts" />

// @Filename: file.ts
////interface Fn<T extends string> {
////}
////
////function m<T>(x: Fn<T/**/>) {
////}
goTo.marker("");
verify.codeFix({
    index: 0,
    description: "Add `extends` constraint.",
    newFileContent: {
        "/tests/cases/fourslash/file.ts":
`interface Fn<T extends string> {
}

function m<T extends string>(x: Fn<T>) {
}`
    }
});
