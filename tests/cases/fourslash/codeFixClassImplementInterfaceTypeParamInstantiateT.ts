/// <reference path='fourslash.ts' />

////interface I<T> { x: T; }
////class C<T> implements I<T> {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I<T>"],
    index: 1,
    newFileContent:
`interface I<T> { x: T; }
class C<T> implements I<T> {
    x: T;
}`
});
