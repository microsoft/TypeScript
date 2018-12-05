/// <reference path='fourslash.ts' />

//// interface foo {
////     x: [number, number, [[number, [[boolean,boolean], number, number], number]]];
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: [number, number, [[number, [[boolean,boolean], number, number], number]]];
}
let n: foo = {
    x: [0, 0, [[0, [[false, false], 0, 0], 0]]],
}`,
});
