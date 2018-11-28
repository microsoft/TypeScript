/// <reference path='fourslash.ts' />

//// interface foo {
////     bar: <E>(x: E, y: number) => E;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    bar: <E>(x: E, y: number) => E;
}
let n: foo = {
    bar(): <E>(x: E, y: number) => E {
        throw new Error("Function not implemented.");
    },
}`,
});