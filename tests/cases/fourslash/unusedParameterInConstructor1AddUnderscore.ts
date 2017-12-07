/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////class C1 {
////    constructor(p1: string, public p2: boolean, public p3: any, p5) { p5; }
////}

verify.codeFix({
    description: "Prefix 'p1' with an underscore",
    index: 1,
    newFileContent:
`class C1 {
    constructor(_p1: string, public p2: boolean, public p3: any, p5) { p5; }
}`,
});
