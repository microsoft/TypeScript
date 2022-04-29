/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: "a" | 2;
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `class T {
    a: "a" | 2 = "a";
}`,
    index: 2
})