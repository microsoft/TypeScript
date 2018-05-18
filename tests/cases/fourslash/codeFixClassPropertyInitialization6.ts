/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: "1";
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `class T {
    a: "1" = "1";
}`,
    index: 2
})