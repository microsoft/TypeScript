/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: string;
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `class T {
    a: string = "";
}`,
    index: 2
})