/// <reference path='fourslash.ts' />

//// interface foo {
////     x: [Object];
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: [Object];
}
let n: foo = {
    x: [new Object()],
}`,
});