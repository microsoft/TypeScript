/// <reference path='fourslash.ts' />

//// type alias = () => void
//// interface foo {
////     x: alias;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`type alias = () => void
interface foo {
    x: alias;
}

let n: foo = {
    x(): alias {
        throw new Error("Function not implemented.");
    },
}`,
});