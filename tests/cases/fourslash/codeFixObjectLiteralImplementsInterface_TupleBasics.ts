/// <reference path='fourslash.ts' />

//// interface foo {
////     x: [string, number, any, boolean, object, null, bigint, number[]];
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: [string, number, any, boolean, object, null, bigint, number[]];
}
let n: foo = {
    x: ["", 0, "any", false, new Object(), null, 0, []],
}`,
});