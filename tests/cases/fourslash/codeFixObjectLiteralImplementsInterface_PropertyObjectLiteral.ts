/// <reference path='fourslash.ts' />

//// interface foo {
////     x: {
////         y: string;
////     };
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: {
        y: string;
    };
}

let n: foo = {
    x: {
        y: ""
    },
}`,
});
