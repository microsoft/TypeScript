/// <reference path='fourslash.ts' />

//// class Bar{}
//// interface foo {
////     x: [Bar];
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`class Bar{}
interface foo {
    x: [Bar];
}

let n: foo = {
    x: [new Bar()],
}`,
});
