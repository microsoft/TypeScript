/// <reference path='fourslash.ts' />

//// interface A { x: string; }
//// interface A { y: boolean; }
//// interface A { z: number; }
//// let n: A = { }

verify.codeFix({
    description: "Implement interface 'A'",
    newFileContent:
`interface A { x: string; }
interface A { y: boolean; }
interface A { z: number; }
let n: A = {
    x: "",
    y: false,
    z: 0,
}`,
});