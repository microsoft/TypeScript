/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class C1 {
////    constructor(private p1: string, public p2: boolean, public p3: any, p5) { p5; }
////}

verify.codeFix({
    description: "Prefix 'p1' with an underscore.",
    index: 1,
    newFileContent:
`class C1 {
    constructor(private _p1: string, public p2: boolean, public p3: any, p5) { p5; }
}`,
});
