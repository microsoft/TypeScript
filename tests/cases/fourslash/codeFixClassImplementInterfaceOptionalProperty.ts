/// <reference path='fourslash.ts' />

// @strict: false
////interface IPerson {
////    name: string;
////    birthday?: string;
////}
////class Person implements IPerson {}

verify.codeFix({
    description: "Implement interface 'IPerson'",
    newFileContent:
`interface IPerson {
    name: string;
    birthday?: string;
}
class Person implements IPerson {
    name: string;
    birthday?: string;
}`,
});
