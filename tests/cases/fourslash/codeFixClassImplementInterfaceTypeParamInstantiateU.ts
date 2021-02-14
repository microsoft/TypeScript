/// <reference path='fourslash.ts' />

////interface I<T> { x: T; }
////class C<U> implements I<U> {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I<U>"],
    index: 1,
    newFileContent:
`interface I<T> { x: T; }
class C<U> implements I<U> {
    x: U;
}`
});
