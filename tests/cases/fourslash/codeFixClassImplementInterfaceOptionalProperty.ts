/// <reference path='fourslash.ts' />

////interface IPerson {
////    name: string;
////    birthday?: string;
////}
////class Person implements IPerson {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "IPerson"],
    index: 1,
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
