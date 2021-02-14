/// <reference path='fourslash.ts' />

////interface I<T> { x: T; }
////class C implements I<number> { }

verify.codeFix({
    index: 1,
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I<number>"],
    newFileContent:
`interface I<T> { x: T; }
class C implements I<number> {
    x: number;
}`
});
