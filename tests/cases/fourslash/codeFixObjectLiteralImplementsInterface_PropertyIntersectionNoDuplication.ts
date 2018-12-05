/// <reference path='fourslash.ts' />

//// interface A {
////     a: number;
////     x: string;
//// }
//// interface B {
////     a: number;
////     y: boolean;
//// }
//// interface C { z: A & B }
//// let n: C = { }

verify.codeFix({
    description: "Implement interface 'C'",
    newFileContent:
`interface A {
    a: number;
    x: string;
}
interface B {
    a: number;
    y: boolean;
}
interface C { z: A & B }
let n: C = {
    z: {
        a: 0,
        x: "",
        y: false
    },
}`,
});
