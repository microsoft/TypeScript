/// <reference path='fourslash.ts' />

//// interface foo {
////     bar<T>(x: number, y: T): boolean;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    bar<T>(x: number, y: T): boolean;
}
let n: foo = {
    bar: <T>(x: number, y: T): boolean => {
        throw new Error("Function not implemented.");
    },
}`,
});
