/// <reference path='fourslash.ts' />

//// interface foo {
////     x: Boolean;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: Boolean;
}
let n: foo = {
    x: new Boolean(),
}`,
});
