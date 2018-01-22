/// <reference path='fourslash.ts' />

////interface I<T> { x: T; }
////class C<T> implements I<T> {}

verify.codeFix({
    description: "Implement interface 'I<T>'",
    newFileContent:
`interface I<T> { x: T; }
class C<T> implements I<T> {
    x: T;
}`
});
