/// <reference path='fourslash.ts' />

//// interface foo {
////     x: string;
////     y?: string;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: string;
    y?: string;
}
let n: foo = {
    x: "",
}`,
});