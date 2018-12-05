/// <reference path='fourslash.ts' />

//// type alias = number | boolean
//// interface foo {
////     x: alias;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`type alias = number | boolean
interface foo {
    x: alias;
}

let n: foo = {
    x: 0,
}`,
});
