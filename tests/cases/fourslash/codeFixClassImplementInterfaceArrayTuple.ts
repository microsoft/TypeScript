/// <reference path='fourslash.ts' />

////interface I {
////    x: number[];
////    y: Array<number>;
////    z: [number, string, I];
////}
////
////class C implements I {[| |]}

verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`interface I {
    x: number[];
    y: Array<number>;
    z: [number, string, I];
}

class C implements I {
    x: number[];
    y: number[];
    z: [number, string, I];
}`,
});
