/// <reference path='fourslash.ts' />

//// interface foo {
////     x: [bigint];
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: [bigint];
}
let n: foo = {
    x: [0],
}`,
});
