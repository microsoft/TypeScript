/// <reference path='fourslash.ts' />

////interface I<T> { x: T; }
////class C<U> implements I<U> {}

verify.codeFix({
    description: "Implement interface 'I<U>'",
    // TODO: GH#18445
    newFileContent:
`interface I<T> { x: T; }
class C<U> implements I<U> {\r
    x: U;\r
}`
});
