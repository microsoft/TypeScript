/// <reference path='fourslash.ts' />

//// interface bar { y: number }
//// interface foo {
////     x: bar;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface bar { y: number }
interface foo {
    x: bar;
}
let n: foo = {
    x: {
        y: 0
    },
}`,
});