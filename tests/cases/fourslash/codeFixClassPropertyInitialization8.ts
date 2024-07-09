/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: string | boolean;
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `class T {
    a: string | boolean = false;
}`,
    index: 2
})