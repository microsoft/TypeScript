/// <reference path='fourslash.ts' />

//// interface foo {
////     x: [<T>(a: T, b: T) => boolean];
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: [<T>(a: T, b: T) => boolean];
}
let n: foo = {
    x: [<T>(a: T, b: T): boolean => {
        throw new Error("Function not implemented.");
    } ],
}`,
});
