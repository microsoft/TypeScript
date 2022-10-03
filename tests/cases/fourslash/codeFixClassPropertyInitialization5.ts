/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: boolean;
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `class T {
    a: boolean = false;
}`,
    index: 2
})