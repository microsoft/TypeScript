/// <reference path='fourslash.ts' />

//// interface foo {
////     x: Number;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: Number;
}
let n: foo = {
    x: new Number(),
}`,
});