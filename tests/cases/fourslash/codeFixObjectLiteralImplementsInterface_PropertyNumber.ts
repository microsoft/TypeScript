/// <reference path='fourslash.ts' />

//// interface foo {
////     x: number;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: number;
}
let n: foo = {
    x: 0,
}`,
});