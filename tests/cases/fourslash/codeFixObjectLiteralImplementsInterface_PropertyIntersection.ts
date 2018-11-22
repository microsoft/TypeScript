/// <reference path='fourslash.ts' />

//// interface A { x: string; }
//// interface B { y: boolean; }
//// interface C { z: A & B }
//// let n: C = { }

verify.codeFix({
    description: "Implement interface 'C'",
    newFileContent:
`interface A { x: string; }
interface B { y: boolean; }
interface C { z: A & B }
let n: C = {
    z: {
        x: "",
        y: false
    },
}`,
});