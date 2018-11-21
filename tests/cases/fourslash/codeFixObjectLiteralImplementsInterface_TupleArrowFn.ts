/// <reference path='fourslash.ts' />

//// interface foo {
////     x: [(a: string, b: number) => boolean];
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: [(a: string, b: number) => boolean];
}
let n: foo = {
    x: [(a: string, b: number): boolean => {
        throw new Error("Method not implemented.");
    } ],
}`,
});