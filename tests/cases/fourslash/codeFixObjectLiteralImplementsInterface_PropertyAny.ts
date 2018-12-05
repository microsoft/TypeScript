/// <reference path='fourslash.ts' />

//// interface foo {
////     x: any;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: any;
}
let n: foo = {
    x: "any",
}`,
});
