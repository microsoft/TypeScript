/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: string | number;
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `class T {
    a: string | number = "";
}`,
    index: 2
})