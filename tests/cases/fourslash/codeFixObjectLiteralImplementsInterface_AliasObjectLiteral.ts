/// <reference path='fourslash.ts' />

//// type alias = { y: boolean }
//// interface foo {
////     x: alias;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`type alias = { y: boolean }
interface foo {
    x: alias;
}

let n: foo = {
    x: {
        y: false
    },
}`,
});
