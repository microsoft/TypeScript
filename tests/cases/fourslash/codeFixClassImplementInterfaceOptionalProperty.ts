/// <reference path='fourslash.ts' />

////interface IPerson {
////    name: string;
////    birthday?: string;
////}
////class Person implements IPerson {}

verify.codeFix({
    description: "Implement interface 'IPerson'",
    // TODO: GH#18445
    newFileContent:
`interface IPerson {
    name: string;
    birthday?: string;
}
class Person implements IPerson {\r
    name: string;\r
    birthday?: string;\r
}`,
});
