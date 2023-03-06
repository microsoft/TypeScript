/// <reference path="fourslash.ts" />

// @Filename: file.ts
////function f<T>(x: T) {
////    const y: `${number}` = x/**/;
////}
goTo.marker("");
verify.codeFix({
    index: 0,
    description: "Add `extends` constraint.",
    newFileContent: {
        "/tests/cases/fourslash/file.ts":
`function f<T extends \`$\{number}\`>(x: T) {
    const y: \`$\{number}\` = x;
}`
    }
});
