/// <reference path='fourslash.ts' />

////interface I<T> { x: T; }
////class C<U> implements I<U> {}

verify.codeFix({
    description: "Implement interface 'I<U>'",
    newFileContent:
`interface I<T> { x: T; }
class C<U> implements I<U> {
    x: U;
}`
});
