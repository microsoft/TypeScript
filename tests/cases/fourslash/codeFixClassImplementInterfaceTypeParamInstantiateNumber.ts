/// <reference path='fourslash.ts' />

////interface I<T> { x: T; }
////class C implements I<number> { }

verify.codeFix({
    description: "Implement interface 'I<number>'",
    newFileContent:
`interface I<T> { x: T; }
class C implements I<number> {
    x: number;
}`
});
