/// <reference path='fourslash.ts' />

//// interface foo {
////     x: string[];
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: string[];
}
let n: foo = {
    x: [],
}`,
});
