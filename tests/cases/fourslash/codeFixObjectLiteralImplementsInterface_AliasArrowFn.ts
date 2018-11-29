/// <reference path='fourslash.ts' />

//// type alias = (a: boolean) => void
//// interface foo {
////     x: alias;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`type alias = (a: boolean) => void
interface foo {
    x: alias;
}

let n: foo = {
    x: (a: boolean): void => {
        throw new Error("Function not implemented.");
    },
}`,
});