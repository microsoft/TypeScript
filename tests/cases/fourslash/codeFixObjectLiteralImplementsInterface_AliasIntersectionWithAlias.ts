/// <reference path='fourslash.ts' />

//// interface X { x: number }
//// interface Y { y: boolean }
//// type alpha = X
//// type beta = Y
//// type alias = alpha & beta
//// interface foo {
////     intersection: alias;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface X { x: number }
interface Y { y: boolean }
type alpha = X
type beta = Y
type alias = alpha & beta
interface foo {
    intersection: alias;
}

let n: foo = {
    intersection: {
        x: 0,
        y: false
    },
}`,
});