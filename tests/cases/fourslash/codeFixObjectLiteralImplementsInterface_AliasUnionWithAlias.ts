/// <reference path='fourslash.ts' />

//// interface X { x: number }
//// interface Y { y: boolean }
//// type alpha = X
//// type beta = Y
//// type alias = alpha | beta
//// interface foo {
////     union: alias;
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
type alias = alpha | beta
interface foo {
    union: alias;
}

let n: foo = {
    union: {
        x: 0
    },
}`,
});