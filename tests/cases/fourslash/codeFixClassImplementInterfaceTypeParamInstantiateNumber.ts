/// <reference path='fourslash.ts' />

////interface I<T> { x: T; }
////class C implements I<number> {[| |]}

verify.codeFix({
    description: "Implement interface 'I<number>'",
    // TODO: GH#18445
    newFileContent:
`interface I<T> { x: T; }
class C implements I<number> {\r
    x: number;\r
}`
});
