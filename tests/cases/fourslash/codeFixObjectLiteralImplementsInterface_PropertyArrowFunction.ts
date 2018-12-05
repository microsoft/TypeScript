/// <reference path='fourslash.ts' />

//// interface foo {
////     bar: (x: boolean, y: number) => boolean;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    bar: (x: boolean, y: number) => boolean;
}
let n: foo = {
    bar: (x: boolean, y: number): boolean => {
        throw new Error("Function not implemented.");
    },
}`,
});
