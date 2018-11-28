/// <reference path='fourslash.ts' />

//// type alias = boolean
//// interface foo {
////     x: alias;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`type alias = boolean
interface foo {
    x: alias;
}

let n: foo = {
    x: false,
}`,
});