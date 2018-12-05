/// <reference path='fourslash.ts' />

//// interface foo {
////     x: [boolean];
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: [boolean];
}
let n: foo = {
    x: [false],
}`,
});
