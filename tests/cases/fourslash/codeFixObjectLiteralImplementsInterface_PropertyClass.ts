/// <reference path='fourslash.ts' />

//// class bar{}
//// interface foo {
////     x: bar;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`class bar{}
interface foo {
    x: bar;
}

let n: foo = {
    x: new bar(),
}`,
});