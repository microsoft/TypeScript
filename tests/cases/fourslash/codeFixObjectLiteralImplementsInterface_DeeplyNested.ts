/// <reference path='fourslash.ts' />

//// interface foo {
////     v: { w: { x: { y: { z: number; }; }; }; };
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    v: { w: { x: { y: { z: number; }; }; }; };
}

let n: foo = {
    v: {
        w: {
            x: {
                y: {
                    z: 0
                }
            }
        }
    },
}`,
});