/// <reference path='fourslash.ts' />

//// interface foo {
////     x: String;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: String;
}
let n: foo = {
    x: new String(),
}`,
});
