/// <reference path='fourslash.ts' />

//// interface foo {
////     x: null;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: null;
}
let n: foo = {
    x: null,
}`,
});